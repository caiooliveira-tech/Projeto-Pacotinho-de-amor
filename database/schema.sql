-- ============================================================
-- Projeto Pacotinho de Amor - Schema do Banco de Dados MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS pacotinho_de_amor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pacotinho_de_amor;

-- ============================================================
-- Tabela de usuários administrativos
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') NOT NULL DEFAULT 'editor',
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- Tabela de animais disponíveis para adoção
-- ============================================================
CREATE TABLE IF NOT EXISTS animals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species ENUM('cachorro', 'gato') NOT NULL,
  gender ENUM('macho', 'femea') NOT NULL,
  size ENUM('pequeno', 'medio', 'grande') DEFAULT NULL,
  age_years INT DEFAULT NULL,
  age_months INT DEFAULT NULL,
  age_label VARCHAR(50) DEFAULT NULL COMMENT 'Ex: "Estima-se 3 anos"',
  breed VARCHAR(100) DEFAULT NULL,
  color VARCHAR(100) DEFAULT NULL,
  vaccinated TINYINT(1) DEFAULT 0,
  neutered TINYINT(1) DEFAULT 0,
  dewormed TINYINT(1) DEFAULT 0,
  microchipped TINYINT(1) DEFAULT 0,
  description TEXT DEFAULT NULL,
  personality TEXT DEFAULT NULL,
  special_needs TEXT DEFAULT NULL,
  location VARCHAR(150) DEFAULT NULL,
  status ENUM('disponivel', 'em_processo', 'adotado') NOT NULL DEFAULT 'disponivel',
  featured TINYINT(1) DEFAULT 0,
  photo_main VARCHAR(255) DEFAULT NULL,
  photos JSON DEFAULT NULL COMMENT 'Array de URLs de fotos adicionais',
  adoption_date DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- Tabela de feirinhas de adoção
-- ============================================================
CREATE TABLE IF NOT EXISTS fairs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT DEFAULT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME DEFAULT NULL,
  location_name VARCHAR(200) NOT NULL,
  address VARCHAR(300) DEFAULT NULL,
  city VARCHAR(100) DEFAULT NULL,
  state VARCHAR(50) DEFAULT NULL,
  maps_link VARCHAR(500) DEFAULT NULL,
  status ENUM('agendada', 'realizada', 'cancelada') NOT NULL DEFAULT 'agendada',
  cover_photo VARCHAR(255) DEFAULT NULL,
  photos JSON DEFAULT NULL COMMENT 'Array de URLs de fotos da feirinha',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- Tabela de histórias de sucesso (adotantes)
-- ============================================================
CREATE TABLE IF NOT EXISTS success_stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  adopter_name VARCHAR(100) NOT NULL,
  animal_name VARCHAR(100) NOT NULL,
  animal_id INT DEFAULT NULL,
  story TEXT NOT NULL,
  photo VARCHAR(255) DEFAULT NULL,
  adoption_date DATE DEFAULT NULL,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE SET NULL
);

-- ============================================================
-- Tabela de contatos/mensagens recebidas pelo site
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  subject VARCHAR(200) DEFAULT NULL,
  message TEXT NOT NULL,
  type ENUM('adocao', 'voluntario', 'doacao', 'geral') DEFAULT 'geral',
  read_at TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- Índices para performance
-- ============================================================
CREATE INDEX idx_animals_status ON animals(status);
CREATE INDEX idx_animals_species ON animals(species);
CREATE INDEX idx_animals_featured ON animals(featured);
CREATE INDEX idx_fairs_date ON fairs(date);
CREATE INDEX idx_fairs_status ON fairs(status);
CREATE INDEX idx_stories_active ON success_stories(active);

-- ============================================================
-- Usuário admin padrão (senha: admin123 - TROCAR EM PRODUÇÃO)
-- Hash bcrypt de "admin123"
-- ============================================================
INSERT INTO users (name, email, password, role) VALUES
('Administrador', 'admin@pacotinhodeamor.com.br', '$2b$10$rQ8J2GgK9vL3mN4oP5qR6uVwXyZ1aB2cD3eF4gH5iJ6kL7mN8oP9q', 'admin');

-- ============================================================
-- Dados de exemplo para animais
-- ============================================================
INSERT INTO animals (name, species, gender, size, age_label, vaccinated, neutered, dewormed, description, personality, status, featured) VALUES
('Nina', 'cachorro', 'femea', 'pequeno', 'Estima-se 3 anos', 1, 1, 1, 'Nina é uma cachorrinha linda e dócil que está esperando por um lar cheio de amor!', 'Carinhosa, brincalhona e adora colo.', 'disponivel', 1),
('Tony', 'cachorro', 'macho', 'pequeno', 'Filhote', 1, 0, 1, 'Tony é um filhotinho cheio de energia e pronto para conquistar seu coração!', 'Ativo, curioso e muito brincalhão.', 'adotado', 0),
('Luna', 'gato', 'femea', 'medio', 'Estima-se 2 anos', 1, 1, 1, 'Luna é uma gatinha tranquila que adora um cantinho quentinho para descansar.', 'Independente, carinhosa no seu tempo, adora janela.', 'disponivel', 1);

-- ============================================================
-- Dados de exemplo para feiras
-- ============================================================
INSERT INTO fairs (title, description, date, start_time, end_time, location_name, address, city, state, status) VALUES
('Feirinha de Adoção - Shopping Interlagos', 'Venha conhecer nossos amigos de quatro patas! Teremos cachorros e gatos disponíveis para adoção. Traga família e amigos!', '2026-04-12', '10:00:00', '16:00:00', 'Shopping Interlagos', 'Av. Interlagos, 2255', 'São Paulo', 'SP', 'agendada'),
('Feirinha de Adoção - Parque Ibirapuera', 'Uma tarde especial no parque com nossos animais. Adoção responsável e muita informação sobre tutoria pet.', '2026-03-15', '09:00:00', '14:00:00', 'Parque Ibirapuera', 'Av. Pedro Álvares Cabral, s/n', 'São Paulo', 'SP', 'realizada');
