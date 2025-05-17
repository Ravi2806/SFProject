import { createElement } from 'lwc';
import SearchContact from 'c/searchContact';
import getContacts from '@salesforce/apex/SearchContactController.getContacts';

jest.mock('@salesforce/apex/SearchContactController.getContacts', () => {
    return {
        default: jest.fn()
    };
});

describe('c-search-contact', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders DOM elements', () => {
        // Arrange
        const element = createElement('c-search-contact', {
            is: SearchContact
        });

        // Act
        document.body.appendChild(element);

        // Assert
        expect(element.shadowRoot.children).not.toHaveLength(0);
    });

    it('shows contact list when data is returned', () => {
        // Arrange
        const element = createElement('c-search-contact', {
            is: SearchContact
        });
        const mockData = [
            {
                Id: '0011t00000VtFh0AAF',
                Name: 'Test Contact 1',
                Title: 'Test Title 1',
                Phone: '1234567890',
                Email: 'test1@example.com'
            },
            {
                Id: '0011t00000VtFh1AAF',
                Name: 'Test Contact 2',
                Title: 'Test Title 2',
                Phone: '0987654321',
                Email: 'test2@example.com'
            }
        ];
        getContacts.mockResolvedValue(mockData);

        // Act
        document.body.appendChild(element);

        // Assert
        return Promise.resolve().then(() => {
            const contactList = element.shadowRoot.querySelector('c-contact-list');
            expect(contactList).not.toBeNull();
        });
    });

    it('shows error message when error is returned', () => {
        // Arrange
        const element = createElement('c-search-contact', {
            is: SearchContact
        });
        getContacts.mockRejectedValue({ body: { message: 'An error occurred' } });

        // Act
        document.body.appendChild(element);

        // Assert
        return Promise.resolve().then(() => {
            const errorMessage = element.shadowRoot.querySelector('p');
            expect(errorMessage).not.toBeNull();
            expect(errorMessage.textContent).toBe('An error occurred');
        });
    });

    it('handles search input change', () => {
        // Arrange
        const element = createElement('c-search-contact', {
            is: SearchContact
        });
        const inputElement = element.shadowRoot.querySelector('input');

        // Act
        document.body.appendChild(element);
        inputElement.value = 'Sample Input';
        inputElement.dispatchEvent(new CustomEvent('change'));

        // Assert
        expect(element.searchTerm).toBe('Sample Input');
    });

    it('handles contact click event', () => {
        // Arrange
        const element = createElement('c-search-contact', {
            is: SearchContact
        });
        const mockData = [
            {
                Id: '0011t00000VtFh0AAF',
                Name: 'Test Contact 1',
                Title: 'Test Title 1',
                Phone: '1234567890',
                Email: 'test1@example.com'
            }
        ];
        getContacts.mockResolvedValue(mockData);

        // Act
        document.body.appendChild(element);

        // Assert
        return Promise.resolve().then(() => {
            const contactCard = element.shadowRoot.querySelector('c-contact-card');
            expect(contactCard).not.toBeNull();

            contactCard.dispatchEvent(new CustomEvent('click'));
            expect(element.searchTerm).toBe('');
        });
    });
});