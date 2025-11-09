import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterModal from '../components/CharacterModal';

// Mock the API
jest.mock('../utils/api', () => ({
  fetchPlanet: jest.fn(() => 
    Promise.resolve({
      name: 'Tatooine',
      terrain: 'desert',
      climate: 'arid',
      population: '200000'
    })
  )
}));

const mockCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  films: ['film1', 'film2', 'film3', 'film4'],
  created: '2014-12-09T13:50:51.644000Z',
  homeworld: 'https://swapi.dev/api/planets/1/'
};

describe('CharacterModal', () => {
  it('should display character details correctly', async () => {
    const onClose = jest.fn();
    
    render(<CharacterModal character={mockCharacter} onClose={onClose} />);

    // Check if modal is rendered
    expect(screen.getByTestId('character-modal')).toBeInTheDocument();

    // Check character name
    expect(screen.getByTestId('character-name')).toHaveTextContent('Luke Skywalker');

    // Check height in meters
    expect(screen.getByTestId('character-height')).toHaveTextContent('1.72 m');

    // Check mass
    expect(screen.getByTestId('character-mass')).toHaveTextContent('77 kg');

    // Check number of films
    expect(screen.getByTestId('character-films')).toHaveTextContent('4');

    // Wait for homeworld data to load
    await waitFor(() => {
      expect(screen.getByTestId('homeworld-name')).toHaveTextContent('Tatooine');
    });
  });

  it('should close modal when close button is clicked', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<CharacterModal character={mockCharacter} onClose={onClose} />);

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should close modal when clicking outside', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    
    render(<CharacterModal character={mockCharacter} onClose={onClose} />);

    const backdrop = screen.getByTestId('character-modal');
    await user.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
