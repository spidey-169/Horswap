FROM node:18.19.0-alpine3.18@sha256:c0a5f02df6e631b75ee3037bd4389ac1f91e591c5c1e30a0007a7d0babcd4cd3 as builder

# Install app dependencies
#COPY ./ /source/
COPY ./package.json /source/package.json
COPY ./yarn.lock /source/yarn.lock
COPY ./craco.config.cjs /source/craco.config.cjs
COPY ./scripts/terser-loader.js /source/scripts/terser-loader.js
COPY ./tsconfig.json /source/tsconfig.json
COPY ./lingui.config.ts /source/lingui.config.ts
COPY ./scripts/ /source/scripts/
COPY ./public/ /source/public/
COPY ./.git /source/.git
COPY ./src/ /source/src/
copy ./.eslintrc.js /source/.eslintrc.js
copy ./.swcrc /source/.swcrc

WORKDIR /source
RUN yarn install --frozen-lockfile

# get git
RUN apk add --no-cache git

# Build the app
COPY ./src/utils/__generated__/ /source/src/utils/__generated__/
RUN yarn run build

# Cache the kubo image
FROM ipfs/kubo:v0.25.0@sha256:0c17b91cab8ada485f253e204236b712d0965f3d463cb5b60639ddd2291e7c52 as ipfs-kubo

# Create the base image
FROM debian:12.2-slim@sha256:93ff361288a7c365614a5791efa3633ce4224542afb6b53a1790330a8e52fc7d

# Install kubo and initialize ipfs
COPY --from=ipfs-kubo /usr/local/bin/ipfs /usr/local/bin/ipfs

RUN ipfs init

# Copy build output
COPY --from=builder /source/build /export

# add the build output to IPFS and write the hash to a file
RUN ipfs add --cid-version 1 --quieter --only-hash --recursive /export > ipfs_hash.txt

# print the hash for good measure in case someone is looking at the build logs
RUN cat ipfs_hash.txt

# this entrypoint file will execute `ipfs add` of the build output to the docker host's IPFS API endpoint, so we can easily extract the IPFS build out of the docker image
RUN printf '#!/bin/sh\nipfs --api /ip4/`getent ahostsv4 host.docker.internal | grep STREAM | head -n 1 | cut -d \  -f 1`/tcp/5001 add --cid-version 1 -r /export' >> entrypoint.sh
RUN chmod u+x entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
