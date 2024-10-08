// utils/verifyToken.js
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { createPublicKey } = require("crypto");

const JWKS_URL =
  "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_D0RPdbASL/.well-known/jwks.json";

const getSigningKey = async (kid) => {
  const response = await axios.get(JWKS_URL);
  const keys = response.data.keys;

  const signingKey = keys.find((key) => key.kid === kid);

  if (!signingKey) {
    throw new Error("Invalid KID");
  }

  return signingKey;
};

const verifyToken = async (token) => {
  const decodedHeader = jwt.decode(token, { complete: true });
  const kid = decodedHeader.header.kid;

  const signingKey = await getSigningKey(kid);

  // Construct the public key from n (modulus) and e (exponent)
  const { n, e } = signingKey;

  const publicKey = createPublicKey({
    key: {
      kty: "RSA",
      n: n,
      e: e,
    },
    format: "jwk", // Use JWK format to construct the key
  });

  return jwt.verify(token, publicKey, {
    algorithms: ["RS256"], // Specify the algorithm
  });
};

module.exports = verifyToken;
