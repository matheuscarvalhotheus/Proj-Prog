import jwt from 'jsonwebtoken';

const validatoken = (req, res, next) => {


  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({ message: 'token não encontrado' });
  }
  const [, jwttoken] = token.split(' ');

  jwt.verify(jwttoken, process.env.DATABASE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'token inválido' });
    }

    req.useremail = decoded.useremail;

    next();
  });
};

export default validatoken;