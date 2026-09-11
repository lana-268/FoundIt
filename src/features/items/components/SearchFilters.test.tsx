import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ItemsProvider } from '../context/ItemsContext';
import { HomePage } from '../../../pages/HomePage';

describe('item search', () => {
  beforeEach(() => localStorage.clear());

  it('keeps matching items visible and removes unrelated items', async () => {
    render(<MemoryRouter><ItemsProvider><HomePage /></ItemsProvider></MemoryRouter>);
    await waitForElementToBeRemoved(() => screen.queryByText('Gathering community posts…'));
    expect(screen.getByText('Navy blue backpack')).toBeInTheDocument();
    expect(screen.getByText('Friendly golden retriever')).toBeInTheDocument();

    await userEvent.type(screen.getByRole('textbox', { name: 'Search items' }), 'backpack');

    expect(screen.getByText('Navy blue backpack')).toBeInTheDocument();
    expect(screen.queryByText('Friendly golden retriever')).not.toBeInTheDocument();
  });
});
