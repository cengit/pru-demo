import React from 'react';
import { render } from '@testing-library/react';

import SingleContact from './single-contact';

describe(' SingleContact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SingleContact />);
    expect(baseElement).toBeTruthy();
  });
});
