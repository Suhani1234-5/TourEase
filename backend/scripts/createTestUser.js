const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Importe o model de usuário do seu projeto
const User = require('../models/User');

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Banco conectado.');

    await User.deleteOne({ email: 'teste@tourease.com' });
    console.log('Usuário anterior removido.');

    // Não hasheie aqui — o model faz isso automaticamente no pre-save
    await User.create({
      name: 'Usuário Teste',
      email: 'teste@tourease.com',
      password: 'Teste@123',
    });

    console.log('Usuário de teste criado com sucesso!');
    console.log('Email: teste@tourease.com');
    console.log('Senha: Teste@123');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar usuário:', err.message);
    process.exit(1);
  }
}

createTestUser();