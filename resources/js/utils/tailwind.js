import Vue from "vue";
import VueTailwind from "vue-tailwind";

const theme = {
  TModal: {
    fixedClasses: {
      overlay:
        "z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-50 bg-black",
      wrapper: "z-50 relative mx-auto my-0 max-w-lg mt-12",
      modal: "bg-white shadow overflow-hidden relative rounded-md",
      body: "p-4",
      header:
        "p-10  text-sm font-semibold text-gray-700 flex items-center flex-col justify-between",
      footer:
        "p-10 text-sm font-semibold text-gray-700 flex flex-wrap justify-center",
      close: "absolute right-0 top-0 m-3 text-gray-700 hover:text-gray-600",
      closeIcon: "h-5 w-5 fill-current"
    }
    /*    classes: {
      wrapper: '',
      modal: '',
      body: 'p-4',
      header: 'text-gray-700 border-b',
      footer: 'border-t ',
      close: 'text-gray-700 hover:text-gray-600',
      closeIcon: '',
    },
    variants: {
      clean: {
        modal: 'rounded shadow-lg',
        footer: 'bg-gray-100 ',
        body: 'p-4 text-sm text-gray-700',
        close:
          'bg-blue-100 p-1 flex items-center justify-center leading-normal rounded-full text-blue-80 hover:bg-blue-200',
      },
    },*/
  }
};

Vue.use(VueTailwind, theme);
