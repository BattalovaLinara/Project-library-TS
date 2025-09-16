//  ПРОЕКТ СИСТЕМА УПРАВЛЕНИЯ БИБЛИТЕКОЙ  //

interface Book {
    name: string,
    author: string,
    year?: number,
    ISBN: number
}


interface User {
    readonly id: number | string,
    name: string,
    bookList: Book[]
}

let Library: Book[] = []; //почему не работает без присвоения пустого массива?

type Transaction = ['userID', number | string, 'bookISBN', number, 'date', string, 'status', 'taken' | 'returned'];
let booksTransactions: Transaction[] = []; //почему не работает без присвоения пустого массива?

function addBook(newBook: Book): void {
    Library.push(newBook)
}

//эта функция почему то не срабатывает при поиске по автору, при поиске по названию все работает
function searchBook(name?: string, author?: string): Book[] { 
    
    if(name){
        const found = Library.find(item => item.name === name); //возвращает один ОБЪЕКТ
        return found ? [found] : []; //превращаем результат в массив с объектом или пустой массив
    }

    if(author){
        return Library.filter(item => item.author === author);
    }

    // Если оба параметра не переданы, возвращаем пустой массив
    return [];
}


function checkoutBook(user: User, book: Book): void {
    const today = new Date().toLocaleDateString();
    user.bookList.push(book);
    let info: Transaction = ['userID', user.id, 'bookISBN', book.ISBN, 'date', today, 'status', 'taken'];
    booksTransactions.push(info);
}

function returnBook(user: User, book: Book): void {
    const today = new Date().toLocaleDateString();
    let info: Transaction = ['userID', user.id, 'bookISBN', book.ISBN, 'date', today, 'status', 'returned'];
    booksTransactions.push(info);
}

//Проверка рабты функций
addBook({
    name: 'Медвежий угол',
    author: 'Фредерик Бакман',
    year: 2018,
    ISBN: 1
});
addBook({
    name: 'Сила подсознания',
    author: 'Джо Диспенза',
    ISBN: 2
});
addBook({
    name: 'Вторая жизнь Уве',
    author: 'Фредерик Бакман',
    year: 2015,
    ISBN: 3
});
//console.log(Library)

let foundBook = searchBook(undefined, 'Фредерик Бакман'); //передавать ВСЕГДА два аргумента!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//console.log(foundBook);

let user1: User = {
  id: '001',
  name: 'Linara',
  bookList: []
};

checkoutBook(user1, {
    name: 'Медвежий угол',
    author: 'Фредерик Бакман',
    year: 2018,
    ISBN: 1
})
returnBook(user1, {
    name: 'Медвежий угол',
    author: 'Фредерик Бакман',
    year: 2018,
    ISBN: 1
})
//console.log(booksTransactions)

