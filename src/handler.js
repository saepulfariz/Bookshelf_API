const {
    nanoid
} = require('nanoid');

const {
    books
} = require('./books');


const addBookHandler = (request, h) => {


    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;


   

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (readPage >= pageCount) ? true : false;

    const newBooks = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    
    



    if (name === undefined || name === ''){
        
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }else if(readPage > pageCount){

        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }else{
        books.push(newBooks);
    }
    const isSuccess = books.filter((book) => book.id === id).length > 0;


    
    
    if (isSuccess) {
        

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }


    const response = h.response({
        status: 'fail',
        message: 'Book gagal ditambahkan',
    });
    response.code(400);
    return response;

};



const getAllBooksHandler = (request, h) => {


    const params = request.query;


    if (params.reading) {
        const book = books.filter((b) => b.reading == params.reading);
        const response = h.response({
    
            status: "success",
      
            data: {
      
                books: book.map((b) => ({
    
                    id: b.id,
            
                    name: b.name,
            
                    publisher: b.publisher,
            
                  })),
      
            },
      
          });
      
          response.code(200);
      
          return response;
    }

    if (params.finished) {
        const book = books.filter((b) => b.finished == params.finished);
        const response = h.response({
    
            status: "success",
      
            data: {
      
                books: book.map((b) => ({
    
                    id: b.id,
            
                    name: b.name,
            
                    publisher: b.publisher,
            
                  })),
            },
      
          });
      
          response.code(200);
      
          return response;
    }

    if (params.name) {

        book = books.map(
            ({ id, name, publisher }) => ({ id, name, publisher })
          ).filter(
            (book) => book.name.toLowerCase().includes(params.name.toLowerCase())
          );


        const response = h.response({
    
            status: "success",
      
            data: {
      
                books: book.map((b) => ({
    
                    id: b.id,
            
                    name: b.name,
            
                    publisher: b.publisher
            
                  })),
      
            },
      
          });
      
          response.code(200);
      
          return response;
    }





    if (books.length === 0) {

        const response = h.response({
    
          status: "success",
    
          data: {
    
            books: books,
    
          },
    
        });
    
        response.code(200);
    
        return response;
    
      }
    
      const response = h.response({
    
        status: "success",
    
        data: {
    
          books: books.map((book) => ({
    
              
            id: book.id,
            name: book.name,
            publisher: book.publisher
    
          }))
    
        },
    
      });
    
      response.code(200);
    
      return response;
}



const getBookByIdHandler = (request, h) => {

  const { id } = request.params;

          const book = books.find((b) => b.id === id);

  if (!book) {

    const response = h.response({

      status: "fail",

      message: "Buku tidak ditemukan",

    });

    response.code(404);

    return response;

  }

  const response = h.response({

    status: "success",

    data: {

      book: {

        id: book.id,

        name: book.name,

        year: book.year,

        author: book.author,

        summary: book.summary,

        publisher: book.publisher,

        pageCount: book.pageCount,

        readPage: book.readPage,

        finished: book.finished,

        reading: book.reading,

        insertedAt: book.insertedAt,

        updatedAt: book.updatedAt,

      },

    },

  });

  response.code(200);

  return response;

};

const editBookByIdHandler = (request, h) => {
    const {
        id
    } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;


    const index = books.findIndex((book) => book.id === id);

    const updatedAt = new Date().toISOString();

    if(!name){

        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    if(readPage > pageCount){

        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }


    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

    

        const response = h.response( {
            "status": "success",
            "message": "Buku berhasil diperbarui"
        });
        response.code(200);
        return response;
    }


    const response = h.response({
        "status": "fail",
        "message": "Gagal memperbarui buku. Id tidak ditemukan"
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const {
        id
    } = request.params;

    const index = books.findIndex((book) => book.id === id);


    if (index !== -1) {
        books.splice(index, 1);

        

        const response = h.response({
            "status": "success",
            "message": "Buku berhasil dihapus"
        });
        response.code(200);
        return response;
    }

   
    const response = h.response({
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    });
    response.code(404);
    return response;

};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};