// *************************************************

const init = () => {
  body.init({ name: "body", element: "div" });

  body.addStyles({ border: new Border() });
  body.styles.border.setBorder("all", 1, "px", "solid", "red");
  body.styles.border.setBorder("left", 2, "px", "dashed", "blue");

  body.addStyles({ width: new Width(), height: new Height() });
  body.styles.width.setWidth(5, "px");
  body.styles.height.setHeight(5, "px");

  // console.log(body.styles.height.getHeight());
  // console.log(body.styles.border.getBorderString());
  // console.log(body);

  // sdfsdfsdf

  const img = new DomObject();
  img.init({ name: "image", element: "img" });

  const a = new DomObject();
  a.init({ name: "ancor", element: "a" });
  a.addChildrens([img]);

  const p = new DomObject();
  p.init({ name: "para", element: "p" });

  const span = new DomObject();
  span.init({ name: "span", element: "span" });
  span.setActive(true);

  const span2 = new DomObject();
  span2.init({ name: "span2", element: "span" });

  span.addChildrens([span2]);

  p.addChildrens([span]);

  body.addChildrens([a, p]);
};
