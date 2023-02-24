function getCartItems() {
    fetch("https://paperfox.com.ua/?add-to-cart", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'action=get_cart_items',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        // Обработка полученных товаров в корзине
      })
      .catch(error => console.error(error));
  }

  getCartItems();
  