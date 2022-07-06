# lit-payment-form

Simple integration to lit structure of the [Credit Card Payment Form](https://codepen.io/quinlo/pen/YONMEa) created
by [Adam Quinlan](https://codepen.io/quinlo) on CodePen.

![image](https://user-images.githubusercontent.com/25712863/177168509-7bee5221-9dbb-4345-9f48-30951c8c5a4b.png)

## Demo

[Demo on StackBlitz](https://stackblitz.com/edit/lit-payment-form)

# Installation

```sh
$ npm install lit-payment-form --save
```

## Usage

Use this component by adding the tag to the DOM :

    <payment-form></payment-form>

Bind a function to the @checkoutform event to trigger the function on click on the checkout button :

    <payment-form @checkoutform="function_here"></payment-form>

## Examples

### Into an html page

```html

<html lang="en">
<head>
    <title>Payment form</title>
    <script type="module" src="/src/lit-payment-form.js"></script>
</head>
<body>
<lit-payment-form>
    Title here
</lit-payment-form>
</body>
<script>
    document.querySelector('payment-form').addEventListener('checkoutform', (e) => {
        console.log('form details', e.detail); // {name: '', cardnumber: '', expirationdate: '', securitycode: ''}
    })
</script>
</html>
```

### Into a component

Simple use case :

```jsx
import 'lit-payment-form';

class MyElement extends LitElement {
  render() {
    return html`<lit-payment-form>Title here</lit-payment-form>`;
  }
}

customElements.define('my-element', MyElement);
```

Call a function on click on the checkout button :

```jsx
import 'lit-payment-form';

class MyElement extends LitElement {
  on_checkout_click(e) {
    console.log('form details', e.detail); // {name: '', cardnumber: '', expirationdate: '', securitycode: ''}
  }

  render() {
    return html`<lit-payment-form @checkoutform="on_checkout_click">Title here</lit-payment-form>`;
  }
}

customElements.define('my-element', MyElement);
```
