let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should();

//Carregando nossa API
let server = require('../server.js');

describe('Test server working', function(done){
	it('shoud get a server message', function(done){
		chai.request(server)
			.get('/')
			.end(function(err, res){
				expect(res.status).to.eql(200);
				done();
		});
	});
});

describe('Test Todo is Working',  function(done){

	let id;

	//Test GET
	it('should get ToDos', function(done){
		chai.request(server)
			.get('/todo')
			.end(function(err, res){
				expect(res.body.success).to.eql(true);
				expect(res.body.todos).to.be.an('array');
				done();
		});
	});

	//test POST
	it('shoud create ToDos', function(done){
		chai.request(server)
			.post('/todo')
			.send({title: "Todo Teste"})
			.end(function(err, res){
				expect(res.body.success).to.eql(true);
				expect(res.body.todo).to.not.be.undefined;
				expect(res.body.todo.is_complete).to.eql(false);

				id = res.body.todo._id; //salvando para alterar

				done();
			});
	});
});

