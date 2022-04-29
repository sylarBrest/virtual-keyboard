import './style.scss';

const loadPage = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  const hello = document.createElement('div');
  hello.classList.add('hello');

  document.body.prepend(container);
  container.append(hello);
};

loadPage();

console.log('let\'s start');
