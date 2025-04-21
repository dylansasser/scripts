function lineDraw(){
    document.addEventListener("DOMContentLoaded", () => {
      const svgElements = document.querySelectorAll('[data-draw-trigger]');

      svgElements.forEach(svg => {
        const stroke = svg.querySelector("path[stroke]");
        const id = svg.getAttribute("id");

        if (!stroke) return;
        
        const strokeLength = stroke.getTotalLength();
        stroke.style.setProperty('--stroke-length', strokeLength);
        stroke.style.strokeDasharray = strokeLength;
        stroke.style.strokeDashoffset = 0;

        //TODO: test elements with multiple stroke paths
        //TODO: create defaultVal/attrVal function so props can be set for individual elements
        //TODO: let drawEase 
        //TODO: let drawSpeed
        //TODO: create constant speed function 
        //TODO: create "ignore path" attr so individual strokes arent animated
        //TODO: fix conflict between click and hover triggers
        //(*COMPLETE*) TODO: infinite loop
        //(*COMPLETE*) TODO: scroll trigger

        //TODO: alt method - animate with CSS keyframes
  
        console.log('SVG element', id, 'length of stroke:', strokeLength);

        const triggers = svg.getAttribute("data-draw-trigger").split(",");

        if (triggers.includes("hover") && triggers.includes("click")){
            console.warn('SVG element', id, 'cannot include both hover and click triggers')

        };
        //Draw stroke once
        function drawStroke(){
            gsap.set(stroke, {
              strokeDashoffset:0})
            

            gsap.from(stroke, {
                delay: 0.2,
                strokeDashoffset: (strokeLength),
                duration: 2,
                ease:"power1.out",
                overwrite: true})
            }
        //Loop draw animation
        function drawStrokeLoop() {
            gsap.set(stroke, {
              strokeDashoffset: (strokeLength)})
  
              gsap.to(stroke, {
                  delay: 0.2,
                  strokeDashoffset: 0,
                  duration: 2,
                  repeat: -1,
                  ease:"power1.out",
                  })
                }
        
        //Terminate draw loop
        function stopLoop() {
          gsap.to(stroke, {
            strokeDashoffset: 0,
            overwrite: true
          });

        }
  
        // Page load trigger
        if (triggers.includes("load")) {
            drawStroke ()};
        
  
        // Hover trigger
        if (triggers.includes("hover")) {

             svg.addEventListener("mouseenter", () => {
                drawStrokeLoop()
              }); 

             svg.addEventListener("mouseleave", () => {
                stopLoop();
              });

        }
        
        
      
        // Click trigger
        if (triggers.includes("click")) {
          svg.addEventListener("click", () => {
            drawStroke()
          });
        }

        // Scroll trigger - Animate once when in view
        if (triggers.includes("scroll")) {
        let observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              drawStroke();
              //console.log('SVG element', id, 'in view');
              observer.unobserve(svg);
            }
          });
        });

        observer.observe(svg);
      }

        // Infinite loop while in view
        if (triggers.includes("loop")) {
        let observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              drawStrokeLoop();
              //console.log('SVG element', id, 'loop started');
            } else{
              stopLoop();
              //console.log('SVG element', id, 'loop ended');
            }
          });
        });
        
          observer.observe(svg);
        }

      });
    });
  }
  lineDraw();

    //TODO: external draw triggers
      // Triggered by external elements

      /*
      const triggers = document.querySelectorAll("[data-draw-target]");
      triggers.forEach(trigger => {
        const targetSelector = trigger.getAttribute("data-draw-target");
        const targetPath = document.querySelector(targetSelector);
  
        if (!targetPath) return;
  
        trigger.addEventListener("click", () => {
          targetPath.classList.remove("draw", "draw-loop", "redraw");
          void targetPath.offsetWidth;
          targetPath.classList.add("draw");
        });
      });
      
*/

   