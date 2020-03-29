import React from 'react';
import { render } from '@testing-library/react';

import LogCall from './log-call';

describe(' LogCall', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LogCall />);
    expect(baseElement).toBeTruthy();
  });
});
