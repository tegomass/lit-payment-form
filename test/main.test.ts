import type { IWindow } from 'happy-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '../src/lit-payment-form';

declare global {
    interface Window extends IWindow {
    }
}
//https://devhints.io/chai
describe('main cases', async () => {
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

    function getCvvInput(): HTMLInputElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#securitycode');
    }

    function getExpirationInput(): HTMLInputElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#expirationdate');
    }

    function getGenerateCardButton(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#generatecard');
    }

    function getCreditCardUI(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('.creditcard');
    }

    function getCreditCardNameUI(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#svgname');
    }

    function getCardNumberUI(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#svgnumber');
    }
    function getCreditCardExpirationUI(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#svgexpire');
    }
    function getCreditCardCvvUI(): HTMLElement | null | undefined {
        return getLitPaymentForm()?.shadowRoot?.querySelector('#svgsecurity');
    }

    // function getCreditCardNameBackUI(): HTMLElement | null | undefined {
    //     return getLitPaymentForm()?.shadowRoot?.querySelector('#svgnameback');
    // }

    it('should set the value when input value', () => {
        getNameInput().value = 'John Smith';
        expect(getNameInput()?.value).toEqual('John Smith');
    });

    it('should reflect default card name', () => {
        expect(getCreditCardNameUI().innerText).toEqual('JOHN DOE');
    });

    it('should reflect card name after changing', () => {
        getNameInput().value = 'Will Smith';
        getNameInput().dispatchEvent(new Event('input'));
        expect(getCreditCardNameUI().innerText).toEqual('Will Smith');
    });

    it('should reflect default card name after changing', () => {
        getNameInput().value = 'Will Smith';
        getNameInput().dispatchEvent(new Event('input'));
        getNameInput().value = '';
        getNameInput().dispatchEvent(new Event('input'));
        expect(getCreditCardNameUI().innerText).toEqual('JOHN DOE');
    });

    it('should flip card', () => {
        getCvvInput().dispatchEvent(new Event('focus'));
        expect(getCreditCardUI().className).toContain('flipped');
    });

    it('shouldn\'t flip card', () => {
        getCardNumberInput().dispatchEvent(new Event('focus'));
        expect(getCardNumberUI().className).not.toContain('flipped');
    });

    it('should flip card back', () => {
        getCvvInput().dispatchEvent(new Event('focus'));
        getNameInput().dispatchEvent(new Event('focus'));
        expect(getCreditCardUI().className).to.not.contain('flipped');
    });
    it('shouldn\'t flip card back', () => {
        getCvvInput().dispatchEvent(new Event('focus'));
        getCvvInput().dispatchEvent(new Event('focus'));
        expect(getCreditCardUI().className).to.contain('flipped');
    });
    it('should generate a random cardnumber', () => {
        getGenerateCardButton().click();
        let cardWithoutSpaces = getCardNumberInput()?.value.replace(/ /g, '');
        expect(cardWithoutSpaces.length).to.be.gte(14);
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
    describe('Testing UI values', async () => {
        it('should display [42] ', () => {
            getCardNumberInput().value = '42';
            getCardNumberInput().dispatchEvent(new Event('input'));
            getCardNumberInput().value = '';
            getCardNumberInput().dispatchEvent(new Event('input'));
            getCardNumberInput().value = '42';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getCardNumberUI().innerText).to.be.equal('42');
        })
        it('should display [12/26] ', () => {
            getExpirationInput().value = '1226';
            getExpirationInput().dispatchEvent(new Event('input'));
            getExpirationInput().value = '';
            getExpirationInput().dispatchEvent(new Event('input'));
            getExpirationInput().value = '1226';
            getExpirationInput().dispatchEvent(new Event('input'));
            expect(getCreditCardExpirationUI().innerText).to.be.equal('12/26');
        })
        it('should display [985] ', () => {
            getCvvInput().value = '985';
            getCvvInput().dispatchEvent(new Event('input'));
            getCvvInput().value = '';
            getCvvInput().dispatchEvent(new Event('input'));
            getCvvInput().value = '985';
            getCvvInput().dispatchEvent(new Event('input'));
            expect(getCreditCardCvvUI().innerText).to.be.equal('985');
        })
    });
    describe('Testing all cards combinations', async () => {
        it('should display [american express] logo card', () => {
            getCardNumberInput().value = '371449635398431';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#amex')).to.exist;
        });
        it('should display [discover] logo card', () => {
            getCardNumberInput().value = '6011000990139424';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#discover')).to.exist;
        });
        it('should display [diners] logo card', () => {
            getCardNumberInput().value = '30569309025904';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#diners')).to.exist;
        });
        it('should display [mastercard] logo card', () => {
            getCardNumberInput().value = '5200828282828210';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#mastercard')).to.exist;
        });
        it('should display [jcb] logo card', () => {
            getCardNumberInput().value = '3566002020360505';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#jcb')).to.exist;
        });
        it('should display [jcb15] logo card', () => {
            getCardNumberInput().value = '180078244412845';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#jcb')).to.exist;
        });
        it('should display [maestro] logo card', () => {
            getCardNumberInput().value = '6759649826438453';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#maestro')).to.exist;
        });
        it('should display [visa] logo card', () => {
            getCardNumberInput().value = '4242424242424242';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#visa')).to.exist;
        });
        it('should display [unionpay] logo card', () => {
            getCardNumberInput().value = '6200000000000005';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('#unionpay')).to.exist;
        });
        it('should display no logo card', async () => {
            getCardNumberInput().value = '1111111111111111';
            getCardNumberInput().dispatchEvent(new Event('input'));
            expect(getLitPaymentForm()?.shadowRoot?.querySelector('.lightcolor.grey')).to.exist;
        });
    });
});
