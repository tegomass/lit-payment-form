# lit-payment-form

Simple integration to lit structure of the [Credit Card Payment Form](https://codepen.io/quinlo/pen/YONMEa) created by [Adam Quinlan](https://codepen.io/quinlo) on CodePen.

![image](https://user-images.githubusercontent.com/25712863/177168509-7bee5221-9dbb-4345-9f48-30951c8c5a4b.png)


## Usage

Use this component by adding the tag to the DOM : 

    <payment-form></payment-form>

Bind a function to the @checkoutform event to trigger the function on click on the checkout button : 

    <payment-form @checkoutform="function_here"></payment-form>
