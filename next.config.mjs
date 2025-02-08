/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['app', 'components', 'lib', 'loader', 'hooks','fetcher', 'actions', 'logic'],
    },
};

export default nextConfig;
