(function IIFE() {
  const counter = () => {
      let count = 0;
      return () => {
          count += 1;
          return count;
      };
  };

  const nextId = counter();
  const items = {};

  const addButton = document.querySelector('.outgoing');
  const list = document.querySelector('.items');
  const newItemEl = document.querySelector('.to-add');

  const renderList = (items) => {
      list.innerHTML = Object.keys(items).map((key) => {
          const item = items[key];
          return `
      <li>
      <span data-id="${key}">
          <div class="item">
            <div class="description">
                <span>${item.unit}</span>
            </div>
            <div>
              <button data-id="${key}" class="minus-btn" type="button" name="button" ${item.itemQuantity == 0 ? 'disabled' : ''}>-</button>
              <input type="text" name="name" value="${item.itemQuantity}">
              <button data-id="${key}" class="plus-btn" type="button" name="button">+</button>
              <button data-id="${key}" class="delete-btn" type="button" name="button">x</button>
            </div>
            
          </div>
      </span>
      </li>    
    `;
      }).join('\n');
  };

  list.addEventListener('click', function(event) {
      const id = event.target.dataset.id;

      if (event.target.classList.contains("plus-btn")) {
          items[id].itemQuantity += 1;
      }

      if (event.target.classList.contains("minus-btn")) {
          items[id].itemQuantity -= 1;
      }

      if (event.target.classList.contains('delete-btn')) {
          delete items[id];
      }
      renderList(items);
  });

  addButton.addEventListener('click', function(event) {
      const text = newItemEl.value.toUpperCase();

      items[nextId()] = {
          unit: text,
          itemQuantity: 0
      };
      renderList(items);

      newItemEl.value = '';
      addButton.disabled = true;
  });

  newItemEl.addEventListener('keyup', function(event) {
      const text = event.target.value;
      addButton.disabled = !text;
  });

  addButton.disabled = true;
  renderList(items);
})();