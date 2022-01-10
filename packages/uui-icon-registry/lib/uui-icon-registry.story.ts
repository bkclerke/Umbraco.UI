import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import '@umbraco-ui/uui-icon-registry/lib/index';
export default {
  id: 'uui-icon-registry',
  title: 'Design/Icon Registry',
  component: 'uui-icon-registry',
};

const myCustomSVGData =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M460.5 78.244l-26.472-26.473c-16.867-16.868-44.216-16.865-61.083.003l-61.466 61.468-29.702-29.699-58.764 58.763 24.501 24.499L79.748 334.573C68.761 345.557 62.6 359.972 61.767 374.81l-9.766 9.764c-20.867 20.881-20.863 54.838.002 75.704 10.106 10.108 23.548 15.679 37.85 15.679 14.297 0 27.733-5.568 37.847-15.67l9.758-9.765c15.211-.821 29.394-7.139 40.248-17.99l167.771-167.767 24.493 24.495 58.765-58.764-29.698-29.699 61.465-61.466c16.87-16.869 16.87-44.218-.002-61.087zM150.574 405.398a23.298 23.298 0 01-16.532 6.846c-3.501 0-7.007-.782-10.231-2.343v.007l-23.242 23.236a15.092 15.092 0 01-10.716 4.439 15.1 15.1 0 01-10.715-4.439c-5.919-5.922-5.919-15.516-.002-21.436l23.233-23.238.008-.004c-4.226-8.725-2.741-19.518 4.503-26.761l167.769-167.768 43.695 43.693-167.77 167.768z"></path></svg>';

export const ProvideCustomIcon: Story = () =>
  html`
    <uui-icon-registry .icons=${{ myCustomIcon: myCustomSVGData }}>
      <uui-icon name="myCustomIcon"></uui-icon>
    </uui-icon-registry>
  `;

export const ProvideDynamicCustomIconRegistry: Story = () =>
  html`
    Icon Registry Element is a element that provides a Icon Registry. The
    Element holds a empty icon registry pr. default. This registry can be access
    or replaced to provide icons of your interest. This example shows how to
    build a custom icon registry that provides an icon loaded externally:

    <code type="typescript">
      class MyCustomIconRegistry extends UUIIconRegistry { protected
      acceptIcon(iconName: string): boolean { if(iconName ===
      "anIconNameIAccept") { const icon = this.provideIcon(iconName); // Load
      SVG and set it on this icon-object: icon.svg = "..."; return true; }
      return false; } } const MyIconRegistry =
      document.getElementById('MyRegistry'); MyIconRegistry.registry = new
      MyCustomIconRegistry();
    </code>

    <code type="html">
      <uui-icon-registry id="MyRegistry">
        <uui-icon name="MyIcon"></uui-icon>
      </uui-icon-registry>
    </code>
  `;

/*

// Example of how to define icon data:
iconRegistry.defineIcon(
  'bug',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M85.065 420.232c-6.507 6.509-6.507 17.054 0 23.56 6.504 6.514 17.056 6.514 23.559.002l33.049-33.042c-5.737-10.21-10.526-21.23-14.25-32.877l-42.358 42.357zm339.124-198.011c6.51-6.501 6.51-17.053 0-23.562-6.502-6.504-17.055-6.504-23.562 0l-29.451 29.452c5.74 10.208 10.526 21.231 14.251 32.879l38.762-38.769zm-305.782 97.213c0-5.818.263-11.562.759-17.226l-46.137-.002c-9.204.002-16.662 7.458-16.662 16.66 0 9.203 7.458 16.664 16.662 16.664h46.046a197.503 197.503 0 0 1-.668-16.096zm8.151-55.715a177.918 177.918 0 0 1 13.86-33.274l-31.786-31.786c-6.51-6.504-17.061-6.504-23.565 0-6.509 6.51-6.509 17.062 0 23.562l41.491 41.498zm257.974 116.854c-3.882 11.521-8.813 22.389-14.676 32.448l30.776 30.772c6.505 6.512 17.056 6.512 23.56-.002 6.507-6.506 6.507-17.051 0-23.56l-39.66-39.658zm51.697-78.367l-42.545.002c.497 5.663.758 11.407.758 17.226 0 5.432-.234 10.8-.666 16.097h42.453c9.203 0 16.662-7.461 16.662-16.664 0-9.203-7.459-16.659-16.662-16.661zM162.407 70.389c27.314.198 39.683 10.33 46.938 21.625 5.964 9.492 7.656 20.515 8.036 27.072-15.226 10.442-26.149 26.689-29.561 45.572h138.623c-3.413-18.886-14.338-35.135-29.564-45.577.376-6.559 2.071-17.583 8.04-27.068 7.246-11.295 19.614-21.425 46.942-21.625a7.233 7.233 0 0 0 0-14.466c-31.162-.202-49.95 13.171-59.234 28.45-5.947 9.627-8.48 19.591-9.55 27.353a70.4 70.4 0 0 0-25.938-4.981 70.43 70.43 0 0 0-25.96 4.986c-1.069-7.761-3.602-17.725-9.549-27.358-9.287-15.281-28.068-28.652-59.223-28.45-4.006 0-7.238 3.238-7.238 7.233s3.232 7.234 7.238 7.234zm-18.253 248.188c0 71.594 44.03 130.722 100.454 138.429V193.879h-37.77c-37.118 22.856-62.684 70.152-62.684 124.698zm14.814 4.98c0-10.557 12.448-19.117 27.805-19.117 15.354 0 27.802 8.561 27.802 19.117s-12.447 19.112-27.802 19.112c-15.357 0-27.805-8.556-27.805-19.112zm54.263 82.629c-7.163 0-12.966-8.796-12.966-19.645 0-10.85 5.803-19.648 12.966-19.648 7.158 0 12.964 8.799 12.964 19.648.001 10.849-5.806 19.645-12.964 19.645zm9.525-132.331c-7.467 7.463-22.32 4.714-33.177-6.146-10.857-10.854-13.61-25.714-6.144-33.176 7.465-7.464 22.318-4.717 33.176 6.141 10.857 10.859 13.611 25.715 6.145 33.181zm84.664-79.976h-37.77v263.127c56.423-7.707 100.459-66.835 100.459-138.429 0-54.546-25.566-101.842-62.689-124.698zm-10.414 46.795c10.859-10.857 25.711-13.604 33.176-6.141 7.469 7.462 4.716 22.322-6.141 33.176-10.861 10.86-25.713 13.609-33.18 6.146-7.465-7.466-4.713-22.322 6.145-33.181zm3.382 165.512c-7.159 0-12.964-8.796-12.964-19.645 0-10.85 5.805-19.648 12.964-19.648 7.16 0 12.964 8.799 12.964 19.648s-5.804 19.645-12.964 19.645zm26.46-63.517c-15.357 0-27.807-8.556-27.807-19.112s12.449-19.117 27.807-19.117c15.355 0 27.804 8.561 27.804 19.117s-12.449 19.112-27.804 19.112z"/></svg>'
);

iconRegistry.defineIcon(
  'info',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M230.384 224.6c4.293-11.035-1.231-16.553-6.143-16.553-22.688 0-52.154 53.374-63.173 53.374-4.311 0-7.99-4.307-7.99-7.985 0-11.043 26.991-36.805 34.982-44.783 24.528-23.312 56.44-41.104 92.027-41.104 26.368 0 54.601 15.945 32.515 75.471L268.42 362.638c-3.665 9.205-10.415 24.557-10.415 34.367 0 4.29 2.438 8.595 7.348 8.595 18.396 0 52.155-52.158 60.748-52.158 3.061 0 7.351 3.675 7.351 9.196 0 17.793-71.771 93.876-133.744 93.876-22.088 0-37.423-10.421-37.423-33.738 0-29.441 20.854-79.757 25.169-90.194l42.93-107.982zm33.125-120.861c0-26.992 23.309-49.073 50.308-49.073 24.556 0 42.336 16.554 42.336 41.716 0 28.233-23.303 49.094-50.914 49.094-25.151 0-41.73-16.576-41.73-41.737z"/></svg>'
);

iconRegistry.defineIcon(
  'delete',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M401.431 167.814l-58.757-58.76-88.029 88.026-88.028-88.026-58.76 58.76 88.026 88.027-88.026 88.024 58.76 58.768 88.028-88.031 88.029 88.031 58.757-58.768-88.027-88.024z"/></svg>'
);

iconRegistry.defineIcon(
  'colorpicker',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M460.5 78.244l-26.472-26.473c-16.867-16.868-44.216-16.865-61.083.003l-61.466 61.468-29.702-29.699-58.764 58.763 24.501 24.499L79.748 334.573C68.761 345.557 62.6 359.972 61.767 374.81l-9.766 9.764c-20.867 20.881-20.863 54.838.002 75.704 10.106 10.108 23.548 15.679 37.85 15.679 14.297 0 27.733-5.568 37.847-15.67l9.758-9.765c15.211-.821 29.394-7.139 40.248-17.99l167.771-167.767 24.493 24.495 58.765-58.764-29.698-29.699 61.465-61.466c16.87-16.869 16.87-44.218-.002-61.087zM150.574 405.398a23.298 23.298 0 01-16.532 6.846c-3.501 0-7.007-.782-10.231-2.343v.007l-23.242 23.236a15.092 15.092 0 01-10.716 4.439 15.1 15.1 0 01-10.715-4.439c-5.919-5.922-5.919-15.516-.002-21.436l23.233-23.238.008-.004c-4.226-8.725-2.741-19.518 4.503-26.761l167.769-167.768 43.695 43.693-167.77 167.768z"></path></svg>'
);

iconRegistry.defineIcon(
  'picture',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M246.486 299.31l-85.604-91.047-58.21 107.66v29.658h289.12c-36.821-31.753-114.476-99.682-114.476-99.682l-30.83 53.411zM347 230.786c16.062 0 29.073-13 29.073-29.06 0-16.04-13.012-29.062-29.073-29.062-16.019 0-29.038 13.021-29.038 29.062 0 16.06 13.019 29.06 29.038 29.06zM37.74 102.699v306.569h434.688V102.699H37.74zm396.082 267.916H77.635l-.016-228.033h354.928v.017h1.275v228.016z"></path></svg>'
);

iconRegistry.defineIcon(
  'shopping-basket-alt',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M198.664 161.585l-.005-.006s-.006-.065-.03-.437a147.748 147.748 0 01-.216-8.293c-.066-11.91 1.413-33.954 8.334-50.872 3.407-8.498 7.999-15.48 13.565-20.059 5.634-4.538 12.123-7.381 22.623-7.475h25.036c10.6.104 17.123 3.033 22.855 7.782 8.52 7.062 14.715 20.391 18.013 34.776 3.379 14.284 4.059 29.022 4.043 37.48 0 2.375-.045 4.256-.092 5.516-.028.627-.046 1.106-.06 1.399-.018.301-.023.35-.018.35l30.712 2.042c.016-.284.238-3.735.238-9.307-.069-13.335-1.102-38.549-10.403-62.546-4.704-11.974-11.637-23.883-22.485-33.149-10.771-9.299-25.656-15.219-42.804-15.116h-25.036c-16.848-.099-31.511 5.544-42.241 14.533-16.178 13.552-23.803 32.524-28.089 49.949-4.221 17.538-4.954 34.179-4.97 44.695 0 6.62.316 10.785.339 11.105l30.691-2.367zm185.701 28.729H126.94l-20.033 277.87h297.489l-20.031-277.87z"></path></svg>'
);

iconRegistry.defineIcon(
  'newspaper-alt',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M174.228 247.824h60.975v60.975h-60.975zm0-115.391h228.379v75.56H174.228zm100.767 114.916h127.611v25.403H274.995zm0 55.405h127.611v25.402H274.995zm0 51.189h127.611v25.404H274.995zM114.163 70.231v52.474H50.306v271.89c0 26.013 21.16 47.174 47.168 47.174h317.047c26.012 0 47.174-21.161 47.174-47.174V70.231H114.163zm0 324.364c0 9.201-7.486 16.686-16.689 16.686-9.197 0-16.682-7.484-16.682-16.686V153.191h33.371v241.404zm317.043 0c0 9.201-7.484 16.686-16.686 16.686H141.603a46.928 46.928 0 003.049-16.686V100.718h286.555v293.877z"></path></svg>'
);

iconRegistry.defineIcon(
  'crown-alt',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M91.475 374.594h329.05v37.281H91.475zm311.64-144.555c-51.386 0-116.679-27.02-147.118-129.914-32.316 102.711-97.309 129.744-148.18 129.744-24.557 0-45.825-6.299-58.534-13.43L88.79 339.404h332.189l41.738-122.965c-12.797 7.178-34.541 13.6-59.602 13.6zm-147.114 61.82c-16.771 0-30.367-13.596-30.367-30.367 0-16.77 13.595-30.365 30.367-30.365 16.771 0 30.367 13.596 30.367 30.365 0 16.772-13.597 30.367-30.367 30.367z"></path></svg>'
);

iconRegistry.defineIcon(
  'wand',
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M306.997 124.391c8.992 0 16.277-7.286 16.277-16.276V57.184c.002-8.989-7.285-16.276-16.277-16.276-8.983 0-16.271 7.287-16.273 16.276v50.932c0 8.989 7.29 16.278 16.273 16.275zm80.752 23.244l36.015-36.017c6.356-6.357 6.353-16.662 0-23.015-6.357-6.356-16.662-6.356-23.019 0l-36.013 36.014c-6.356 6.356-6.358 16.661 0 23.018 6.354 6.356 16.661 6.353 23.017 0zm-161.066 2.552c6.354 6.353 16.663 6.353 23.018 0 6.353-6.356 6.353-16.662 0-23.018l-36.018-36.018c-6.355-6.353-16.661-6.353-23.015 0-6.359 6.356-6.359 16.662 0 23.018l36.015 36.018zm159.5 113.463c-6.356-6.357-16.663-6.357-23.02 0-6.354 6.355-6.354 16.661 0 23.018l36.015 36.014c6.356 6.356 16.663 6.356 23.018 0 6.358-6.356 6.358-16.658 0-23.015l-36.013-36.017zm-70.019-131.061L37.625 411.125l58.761 58.76 278.541-278.533-58.763-58.763zm-65.195 99.172l67.606-67.608 24.787 24.788-67.606 67.608-24.787-24.788zm205.2-41.684h-50.934c-8.99 0-16.275 7.289-16.275 16.275-.004 8.985 7.285 16.275 16.275 16.275h50.934c8.988 0 16.273-7.29 16.273-16.275 0-8.99-7.285-16.275-16.273-16.275z"></path></svg>'
);

  */
