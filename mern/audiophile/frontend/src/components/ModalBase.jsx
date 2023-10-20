import React from 'react';
import { forwardRef } from 'react';
import ModalCart from './ModalCart';
import ModalOrdered from './ModalOrdered';

const Modal = forwardRef(({ className }, ref) => {
  return (
    <div ref={ref} className={className}>
      {className.includes('shopping-modal') ? <ModalCart /> : <ModalOrdered />}
    </div>
  );
});

export default Modal;
