const environment = {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'production',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    'a1e8714e1f0b85f8791cb3fc79d0043768e32b81970b3b7a4fdc230c14789cbbb19c0fdc9a71aa2006df297933c5190352edbbea71e632d3d142bcffb981b749',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    '1dc30fc3c6cd1fa0c57c579ef060bc8e64b1b028a46302991fb26481b08aeb3d689e4ae1bf0f5f05e6cb9de256d4c4e59ca44281737a6abe6556fccfecd5c66a',
};

export default environment;
