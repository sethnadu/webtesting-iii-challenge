import React from 'react';
import renderer from 'react-test-renderer'; 
import { render} from "@testing-library/react";

import Display from "./Display.js";


describe('<Display />', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(<Display />); 
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it("open unlocked as default states", () => {
        const { getByText } = render(<Display />)
        getByText(/unlocked/i)
        getByText(/locked/i)
    });
   
  });