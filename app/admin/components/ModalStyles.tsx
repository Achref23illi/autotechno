'use client';

export default function ModalStyles() {
  return (
    <style jsx global>{`
      /* Remove focus styles from modal inputs */
      .modal-form input,
      .modal-form select,
      .modal-form textarea,
      .modal-form button {
        outline: none !important;
        box-shadow: none !important;
      }
      
      .modal-form input:focus,
      .modal-form select:focus,
      .modal-form textarea:focus {
        border-color: #eab308 !important;
        outline: none !important;
        box-shadow: none !important;
      }
      
      /* Remove focus rings from buttons */
      .modal-form button:focus {
        outline: none !important;
        box-shadow: none !important;
      }

      .modal-form {
        z-index: 50 !important;
      }
      
      body.modal-open {
        overflow: hidden;
      }
      
      .modal-form .fixed.inset-0 {
        z-index: 40;
      }
      
      .modal-form .inline-block {
        z-index: 50;
      }
    `}</style>
  );
}