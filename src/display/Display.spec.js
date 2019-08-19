import React from 'react';
import renderer from 'react-test-renderer'; 
import { render, fireEvent} from "@testing-library/react";

import Display from "./Display.js";


describe('<Display />', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(<Display />); 
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it("open unlocked as default states", () => {
        const { getByText } = render(<Display />)
        getByText(/Unlocked/)
        getByText(/open/i)
    });
    it("Closed if 'closed prop' is 'true' 'open' if otherwise", () => {
        const {getByText, rerender} = render(<Display locked = {false} closed={false}/>)
        const open = getByText(/open/i);
        const unlocked = getByText(/Unlocked/);

        expect(open.className).toBe('led green-led');
        expect(open.textContent).toBe('Open')
        expect(unlocked.className).toBe('led green-led');
        expect(unlocked.textContent).toBe('Unlocked')

        rerender(<Display locked = {true} closed={true}/>)
        
        expect(open.className).toBe('led red-led');
        expect(open.textContent).toBe('Closed')
        expect(unlocked.className).toBe('led red-led');
        expect(unlocked.textContent).toBe('Locked')

      })
   
  });