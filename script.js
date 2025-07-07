// Tarefas (GET)
fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
  .then(response => response.json())
  .then(tarefas => {
    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';
    tarefas.forEach(tarefa => {
      const item = document.createElement('li');
      item.textContent = `${tarefa.title} - ${tarefa.completed ? '✅ Completa' : '❌ Incompleta'}`;
      lista.appendChild(item);
    });
  })
  .catch(() => {
    document.getElementById('lista-tarefas').innerHTML = '❌ Erro ao carregar tarefas.';
  });

// Comentários (POST)
document.getElementById('form-comentario').addEventListener('submit', function (event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const comentario = document.getElementById('comentario').value;

  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nome, body: comentario })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Comentário enviado:', data);
      alert('✅ Comentário enviado com sucesso!');
      this.reset();
    })
    .catch(() => alert('❌ Erro ao enviar comentário.'));
});

// Rick and Morty (GET)
function buscarPersonagem() {
  const nome = document.getElementById('nome-personagem').value.trim();
  const resultado = document.getElementById('resultado-personagem');
  resultado.innerHTML = '🔄 Buscando...';

  if (!nome) {
    resultado.innerHTML = '⚠️ Digite um nome.';
    return;
  }

  fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nome)}`)
    .then(response => {
      if (!response.ok) throw new Error('Não encontrado');
      return response.json();
    })
    .then(data => {
      const p = data.results[0];
      resultado.innerHTML = `
        <h3>${p.name}</h3>
        <img src="${p.image}" alt="${p.name}">
        <p>Status: ${p.status === 'Alive' ? '🟢 Vivo' : p.status === 'Dead' ? '🔴 Morto' : '⚪ Desconhecido'}</p>
      `;
    })
    .catch(() => {
      resultado.innerHTML = '❌ Personagem não encontrado.';
    });
}
