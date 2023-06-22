import md5 from 'crypto-js/md5';

const getGravatarUrl = (playerEmail) => `https://www.gravatar.com/avatar/${md5(playerEmail).toString()}`;

export default getGravatarUrl;
