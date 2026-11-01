    case 'camera': {
      for (const a of [0.6, 2.7, 4.8]) { const l = mesh(G.cyl(.04, .05, .9, 6), mats.wood2, Math.cos(a) * .32, .4, Math.sin(a) * .32, g); l.rotation.z = Math.cos(a) * .32; l.rotation.x = -Math.sin(a) * .32; }
      mesh(G.box(1.8, 1.1, .9), mats.dark, 0, 1.4, 0, g);
      mesh(G.box(.6, .28, .7), mats.dark, -.45, 2.08, 0, g);
      const lens = mesh(G.cyl(.4, .44, .5, 20), mats.metal, .1, 1.4, .62, g); lens.rotation.x = Math.PI / 2;
      const glass = mesh(G.cyl(.28, .28, .52, 20), mats.glass, .1, 1.4, .64, g); glass.rotation.x = Math.PI / 2;
      const fl = mesh(G.box(.32, .2, .05), mats.window, .58, 1.78, .46, g); g.userData.lamp = fl;
      mesh(G.cyl(.12, .12, .14, 12), R, .6, 2.02, 0, g);
      mesh(G.box(1.82, .14, .92), R, 0, 1.0, 0, g); break; }
    case 'market': {
      const cols = [mats.red, mats.yellow, mats.blue];
      for (let k = 0; k < 3; k++) {
        const x = -1.05 + k * 1.05;
        mesh(G.box(.85, .5, .6), mats.wood, x, .25, 0, g);
        for (const sx of [-.38, .38]) mesh(G.cyl(.03, .03, 1.2, 6), mats.wood2, x + sx, .6, -.25, g);
        const aw = mesh(G.box(.95, .07, .85), cols[k], x, 1.22, .05, g); aw.rotation.x = .28;
        for (let j = 0; j < 3; j++) mesh(G.sph(.11, 8, 6), [mats.red, mats.yellow, mats.leaf3][(j + k) % 3], x - .22 + j * .22, .6, .05, g);
      }
      const sign = new THREE.Group(); sign.position.set(0, 2.1, -.3); g.add(sign); g.userData.spin2 = sign;
      mesh(G.box(1.3, .45, .06), mats.wall, 0, 0, 0, sign); mesh(G.box(1.1, .1, .07), A, 0, .05, 0, sign); mesh(G.cyl(.03, .03, .8, 6), mats.wood2, 0, -.5, 0, sign); break; }
    case 'post': {
      mesh(G.box(1.8, 1.3, 1.2), mats.wall, -.25, .65, 0, g);
      const r = mesh(G.cone(1.35, .7, 4), R, -.25, 1.65, 0, g); r.rotation.y = Math.PI / 4; r.scale.set(1, 1, .82);
      mesh(G.box(.5, .7, .05), mats.wood2, -.25, .35, .61, g);
      mesh(G.box(1, .26, .05), A, -.25, 1.02, .61, g);
      for (const x of [-.85, .35]) mesh(G.box(.3, .3, .05), mats.window, x, .65, .61, g);
      mesh(G.cyl(.07, .07, .6, 8), mats.dark, 1.15, .3, .55, g);
      mesh(G.box(.42, .48, .5), mats.red, 1.15, .82, .55, g); mesh(G.box(.3, .05, .05), mats.dark, 1.15, .95, .81, g);
      const env = new THREE.Group(); env.position.set(-.25, 3, 0); g.add(env); g.userData.float = env; g.userData.spin = env;
      mesh(G.box(.8, .52, .05), mats.white, 0, 0, 0, env);
      const flap = mesh(G.cone(.47, .26, 3), mats.wall2, 0, .14, .03, env); flap.rotation.z = Math.PI; flap.scale.set(1, 1, .1);
      mesh(G.sph(.07, 8, 6), mats.red, 0, .02, .07, env); break; }
