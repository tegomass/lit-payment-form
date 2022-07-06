import type { IWindow } from 'happy-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '../src/lit-payment-form';

declare global {
    interface Window extends IWindow {
    }
}

describe('Button with increment', async () => {
    beforeEach(async () => {
        document.body.innerHTML = '<lit-payment-form>pay here</lit-payment-form>';
        await window.happyDOM.whenAsyncComplete();
        await new Promise(resolve => setTimeout(resolve, 0));
    });

    function getLitPaymentForm(): HTMLElement | null | undefined {
        return document.body.querySelector('lit-payment-form');
    }

    function getCheckoutButton(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#checkout');
    }

    function getNameInput(): HTMLInputElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#name');
    }

    function getCardNumberInput(): HTMLInputElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#cardnumber');
    }

    function getSecurityCodeInput(): HTMLInputElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#securitycode');
    }

    function getGenerateCardButton(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#generatecard');
    }

    function getCreditCard(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('.creditcard');
    }

    function getCreditCardName(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#svgname');
    }


    it('should set the value when input value', () => {
        getNameInput().value = 'John Smith';
        expect(getNameInput()?.value).toEqual('John Smith');
    });

    it('should reflect default card name', () => {
        expect(getCreditCardName().innerText).toEqual('JOHN DOE');
    });

    it('should reflect card name after changing', () => {
        getNameInput().value = 'Will Smith';
        getNameInput().dispatchEvent(new Event('input'));
        expect(getCreditCardName().innerText).toEqual('Will Smith');
    });

    it('should reflect default card name after changing', () => {
        getNameInput().value = 'Will Smith';
        getNameInput().dispatchEvent(new Event('input'));
        getNameInput().value = '';
        getNameInput().dispatchEvent(new Event('input'));
        expect(getCreditCardName().innerText).toEqual('JOHN DOE');
    });

    it('should flip card', () => {
        getSecurityCodeInput().dispatchEvent(new Event('focus'));
        expect(getCreditCard().className).toContain('flipped');
    });

    it('should flip card back', () => {
        getSecurityCodeInput().dispatchEvent(new Event('focus'));
        getNameInput().dispatchEvent(new Event('focus'));
        // getCreditCardButton().click();
        // getCreditCardButton().click();
        expect(getCreditCard().className).to.not.contain('flipped');
    });

    it('should generate a random cardnumber', () => {
        getGenerateCardButton().click();
        let testCards = [
            '4242424242424242',
            '4000000000003063',
            '4000056655665556',
            '5200828282828210',
            '371449635398431',
            '6011000990139424',
            '30569309025904',
            '3566002020360505',
            '6200000000000005',
            '6759649826438453',
        ];
        let cardWithoutSpaces = getCardNumberInput()?.value.replace(/ /g, '');
        expect(cardWithoutSpaces).to.be.oneOf(testCards);
        // expect(getCardNumberInput()?.value).toHaveLength(10);
    });

    it('should dispatch checkoutform event on button [checkout] click', () => {
        const spyClick = vi.fn();
        getLitPaymentForm().addEventListener('checkoutform', spyClick);
        getCheckoutButton().click();
        expect(spyClick).toHaveBeenCalled();
    });

    it('should return default checkout object', () => {
        let checkout = '';
        const getDetail = (e) => {
            checkout = e.detail;
        };
        getLitPaymentForm().addEventListener('checkoutform', getDetail);
        getCheckoutButton().click();
        expect(checkout).toMatchObject({name: '', cardnumber: '', expirationdate: '', securitycode: ''});
    });

    it('should return custom checkout object', () => {
        let checkout = '';
        const getDetail = (e) => {
            checkout = e.detail;
        };
        getLitPaymentForm().addEventListener('checkoutform', getDetail);
        getNameInput().value = 'John DOE';
        getCheckoutButton().click();
        expect(checkout).toMatchObject({name: 'John DOE', cardnumber: '', expirationdate: '', securitycode: ''});
    });
});
