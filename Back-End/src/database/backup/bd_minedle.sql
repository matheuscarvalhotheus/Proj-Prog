CREATE TABLE minigame (
id INTEGER PRIMARY KEY, 
nome TEXT, 
id_assets INTEGER, 
FOREIGN KEY (id_assets) 
REFERENCES assets(id));

CREATE TABLE assets (
id INTEGER PRIMARY KEY, 
dados TEXT);

CREATE TABLE modo_jogo (
id INTEGER PRIMARY KEY, 
nome TEXT,
dif_opcoes TEXT,
id_assets INTEGER, 
FOREIGN KEY (id_assets) 
REFERENCES assets(id));

INSERT INTO assets(id,dados) values (NULL,'{
"mobs": [
 {
  "nome": "creeper",
  "img": "https://drive.google.com/thumbnail?id=1RkwHiFhQNI65YKYDRAItjV-gfaQNupwm"
 },
 {
  "nome": "zumbi",
  "img": "https://drive.google.com/thumbnail?id=1ojFbDVcdlFSP94Up4tk8hTmyMr7M8CAY"
 },
 {
  "nome": "esqueleto",
  "img": "https://drive.google.com/thumbnail?id=159qDPZ-bbpW59qvvzpHfuIFiiwPLzOlO"
 },
 {
  "nome": "aranha",
  "img": "https://drive.google.com/thumbnail?id=1RvrRBkxW26i-JRNz2WeIyNDehB5Ekx9x"
 },
 {
  "nome": "enderman",
  "img": "https://drive.google.com/thumbnail?id=1AxvXX1oP6QVWODOsuF3lDGo98TvcVgMT"
 },
 {
  "nome": "golem de ferro",
  "img": "https://drive.google.com/thumbnail?id=1Ph4uCtV1SESAbSEk05aJ4T0r4t_PY7Xw"
 },
 {
  "nome": "lobo",
  "img": "https://drive.google.com/thumbnail?id=1925cHeotBIcEQqALw-ZWW3FctpIpXEiY"
 },
 {
  "nome": "porco",
  "img": "https://drive.google.com/thumbnail?id=1Y-h_rstl_Eci7fvruug9PAcJXfjZP9t1"
 },
 {
  "nome": "vaca",
  "img": "https://drive.google.com/thumbnail?id=12FYXpbMNzoIoHCQ29aL6IYsMSpY_6ihD"
 },
 {
  "nome": "ovelha",
  "img": "https://drive.google.com/thumbnail?id=1a7y8bAWk5U1SbnKMG0GsvYColM6gVETK"
 }
]
}');
INSERT INTO assets(id,dados) VALUES (NULL,'pocao');
INSERT INTO assets(id,dados) VALUES (NULL,'bloco');
INSERT INTO assets(id,dados) VALUES (NULL,'quebrac');
INSERT INTO assets(id,dados) VALUES (NULL,'quiz');
INSERT INTO assets(id,dados) VALUES (NULL,'{
"coracoes": [  
{  
"nome" : "cheio",
"img" : "https://drive.google.com/thumbnail?id=1AxTOm_kkRNoBV7SttpKuRU9FuROe7_Me"
},
{  
"nome" : "cheio_i",
"img" : "https://drive.google.com/thumbnail?id=1pXoicob0jjEZI7vn5l4ejYYO9yE0ni3s"
},
{  
"nome" : "vazio",
"img" : "https://drive.google.com/thumbnail?id=1LlKSczPm9i1cSLbCxelIp4sODrkEL3E2"
},
{  
"nome" : "vazio_i",
"img" : "https://drive.google.com/thumbnail?id=1gNniktil5bPkJvixEqS6xFUPE5w-9dol"
}
]
}');
INSERT into assets(id,dados) values (NULL,'{
"coracoes": [  
{  
"nome" : "hcheio",
"img" : "https://drive.google.com/thumbnail?id=1HuK9vwBSMhq-nM0HGTKAyfcxF6Q3tROX"
},
{  
"nome" : "hcheio_i",
"img" : "https://drive.google.com/thumbnail?id=1i6pKMnLGvynZAT6gbIuhqq3aWC6_p-1t"
},
{  
"nome" : "vazio",
"img" : "https://drive.google.com/thumbnail?id=1LlKSczPm9i1cSLbCxelIp4sODrkEL3E2"
},
{  
"nome" : "vazio_i",
"img" : "https://drive.google.com/thumbnail?id=1gNniktil5bPkJvixEqS6xFUPE5w-9dol"
}
]
}');
INSERT into minigame(id,nome,id_assets) values (NULL,'mobs',1), (NULL,'poção',2), (NULL,'bloco',3), (NULL,'quebra-cabeça',4), (NULL,'quiz',5);
INSERT into modo_jogo(id,nome,dif_opcoes,id_assets) values (NULL,'survival', '["fácil", "normal", "difícil"]', 6), (NULL,'hardcore', '["difícil"]', 7), (NULL,'criativo', '["nenhum"]', NULL);