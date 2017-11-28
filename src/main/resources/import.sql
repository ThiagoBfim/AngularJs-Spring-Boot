INSERT INTO MODELO (id, descricao) values (nextval('modelo_sequence'), 'Sedan');

INSERT INTO FABRICANTE (id, nome, pais) values (nextval('fabricante_sequence'), 'Toyota', 'Japão');


insert into carro (id, placa, modelo_id, tracao, categoria, fabricante_id) values (nextval('carro_sequence'), 'AAA1111', 1, 'COMBUSTAO', 'ALUGUEL',1);
insert into carro (id, placa, modelo_id, tracao, categoria, fabricante_id) values (nextval('carro_sequence'), 'BBB2222', 1, 'COMBUSTAO', 'PARTICULAR',1);
insert into carro (id, placa, modelo_id, tracao, categoria, fabricante_id) values (nextval('carro_sequence'), 'CCC3333', 1, 'ELETRICO', 'OFICIAL',1);