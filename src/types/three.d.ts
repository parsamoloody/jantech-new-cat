

export default interface ModelViewerProps {
  title: string;
  selectOptions: {
    beforeSelect: string;
    afterSelectColor: string;
  };
  options: {
    color: {
      controlsImg: string[];
      controlsColor: string[];
      bodiesHex: string[];
    };
    metaTitle: {
      controls: {
        name: string;
        colorsName: string[];
      };
      body: {
        name: string;
        colorsName: string[];
      };
    };
  };
}
