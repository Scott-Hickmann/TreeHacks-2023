/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = withMDX(nextConfig);
