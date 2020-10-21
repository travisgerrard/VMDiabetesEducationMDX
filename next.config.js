const images = require('remark-images');
const emoji = require('remark-emoji');
const withImages = require('next-images');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji],
  },
});

module.exports = module.exports = withMDX(
  withImages({
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  })
);
