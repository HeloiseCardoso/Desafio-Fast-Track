/* Categoria
* 1 feminino
* 2 infantil
* 3 masculino
*/

// JSON de produtos
let produtos = [
    {'id':101,'imagem':'img/feminino/1.jpg','nome':'Blusa Xadrez', 'preco':'139,90','categoria': 1,'quantidade':0}, //Objeto
    {'id':102,'imagem':'img/feminino/2.jpg','nome':'Casaco Casual', 'preco':'218,80','categoria': 1,'quantidade':0},
    {'id':103,'imagem':'img/feminino/3.jpg','nome':'Camisa Social', 'preco':'89,90','categoria': 1,'quantidade':0},
    {'id':104,'imagem':'img/feminino/4.jpg','nome':'Camisa Bege', 'preco':'111,50','categoria': 1,'quantidade':0},
    {'id':105,'imagem':'img/feminino/5.jpg','nome':'Camisa Animal Print', 'preco':'110,50','categoria': 1,'quantidade':0},
    {'id':106,'imagem':'img/feminino/6.jpg','nome':'Camisa Preta', 'preco':'90,00','categoria': 1,'quantidade':0},
    {'id':201,'imagem':'img/infantil/1.jpg','nome':'Camisa Manga Longa', 'preco':'39,90','categoria': 2,'quantidade':0},
    {'id':202,'imagem':'img/infantil/2.jpg','nome':'Camisa Branca', 'preco':'40,90','categoria': 2,'quantidade':0},
    {'id':203,'imagem':'img/infantil/3.jpg','nome':'Vestido Vermelho', 'preco':'55,40','categoria': 2,'quantidade':0},
    {'id':204,'imagem':'img/infantil/4.jpg','nome':'Camisa Amarela', 'preco':'109,90','categoria': 2,'quantidade':0},
    {'id':205,'imagem':'img/infantil/5.jpg','nome':'Casaco Vermelho', 'preco':'109,90','categoria': 2,'quantidade':0},
    {'id':206,'imagem':'img/infantil/6.jpg','nome':'Vestido Camisa Animal Print', 'preco':'100,00','categoria': 2,'quantidade':0},
    {'id':301,'imagem':'img/masculino/1.jpg','nome':'Blusa Xadrez', 'preco':'133,90','categoria': 3,'quantidade':0},
    {'id':302,'imagem':'img/masculino/2.jpg','nome':'Camisa Preta', 'preco':'156,90','categoria': 3,'quantidade':0},
    {'id':303,'imagem':'img/masculino/3.jpg','nome':'Camisa Estampada', 'preco':'132,90','categoria': 3,'quantidade':0},
    {'id':304,'imagem':'img/masculino/4.jpg','nome':'Camisa Base', 'preco':'178,90','categoria': 3,'quantidade':0},
    {'id':305,'imagem':'img/masculino/5.jpg','nome':'Blusa Branca', 'preco':'200,90','categoria': 3,'quantidade':0},
    {'id':306,'imagem':'img/masculino/6.jpg','nome':'Blusa Bege', 'preco':'149,90','categoria': 3,'quantidade':0}

   
];

let carrinhoCompras = [];



function pesquisarProduto(){
    
    var divRowProdutos = document.getElementById('divRow');
    var inputBusca = document.getElementById('busca');
    var nomeDoProduto = inputBusca.value.trim().toLowerCase();
    limparCatalogo();
   
    
    var produtoEncontrado;
    for(let i=0; i < produtos.length; i++){
        if(produtos[i].nome.toLowerCase().startsWith(nomeDoProduto) || produtos[i].nome.toLowerCase().endsWith(nomeDoProduto)){ 
            produtoEncontrado = criarCard(produtos[i]);
            divRowProdutos.appendChild(produtoEncontrado);
        }  
    }
}


        
function limparCatalogo(){
    const divRowProdutos = document.getElementById('divRow'); 
    divRowProdutos.innerText=' ';

}





function filtrarProdutos(categoria){
    let produtosCategoria = [];
    for(let i=0; i < produtos.length; i++){
        if(produtos[i].categoria == categoria){
            produtosCategoria.push(produtos[i]);
        }  
    }
    return produtosCategoria;
}


function inicializarLoja(categoria){
    
    let produtosFiltrados = [];
    if( categoria == -1){
        produtosFiltrados = produtos;
    }else{
        produtosFiltrados = filtrarProdutos(categoria);
    }

    var divRow = document.getElementById('divRow');
    divRow.innerText=' '; //limpar

    for(let i=0; i < produtosFiltrados.length; i++){
       var divCard = criarCard(produtosFiltrados[i]) 
       divRow.appendChild(divCard);
    }
}



function criarCard(produto){
   var divCard =   '<div class="card card-width text-center">' + 
                        '<img src="'+produto.imagem+' "class="card-img-top" alt="">'+
                            '<div class="card-body">'+
                                '<h5 class="card-title">'+produto.nome+'</h5>'+
                                '<h6 class="card-subtitle mb-2 text-body-secondary">'+ produto.preco +'</h6>'+
                                '<button class="btn btn-primary" onclick="adicionarProduto(\''+ produto.id +'\')" type="button">Adicionar</button>'+
                            '</div>'+
                    '</div>';

   var divCol = document.createElement('div');
   divCol.className='col-md mb-2';
   divCol.innerHTML = divCard;

   return divCol;
}



function adicionarProduto(idProduto) { 
    var produto;
    for(let i=0; i < produtos.length; i++){
       if(produtos[i].id == idProduto){  
         produto = produtos[i];
         break;
       }
    }

    if(!verificarProdutoCarrinho(produto.id)){   
        produto.quantidade++;                   
        carrinhoCompras.push(produto);
        
    }
    console.log(carrinhoCompras);
}



function verificarProdutoCarrinho(idProduto){
    for(let i=0; i < carrinhoCompras.length; i++){
        if(carrinhoCompras[i].id == idProduto){   
           carrinhoCompras[i].quantidade++;
            return true;
        }
    }
    return false;
}



function criarCardCarrinho(produto){
    var divCard =   '<div class="card  style="width: 10rem;">' + 
                        '<img src="'+produto.imagem+' "class="card-img-top" alt="">'+
                            '<div class="card-body">'+
                                '<h5 class="card-title">'+produto.nome+'</h5>'+
                                '<h6 class="card-subtitle mb-2 text-body-secondary mt-1">'+ produto.preco +'</h6>'+
                                '<h6 class="mb-2 text-body-secondary">Quantidade:'+produto.quantidade +'</h6>'+
                            '</div>'+
                    '</div>';

    var divCol = document.createElement('div');
    divCol.className='col-md mb-2';
    divCol.innerHTML = divCard;

   return divCol;                          
 }
 



 function abrirModal() {
    var divRowCarrinho = document.getElementById('divRowCarrinho'); 
        for(let i=0; i<carrinhoCompras.length; i++){
            var adicionarProduto =  criarCardCarrinho(carrinhoCompras[i]);
            divRowCarrinho.appendChild(adicionarProduto);
          
        }
    }
             
        
function limparModal(){
    const divRowCarrinho = document.getElementById('divRowCarrinho'); 
    divRowCarrinho.innerText=' ';


}
    