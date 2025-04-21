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

        //TODO: alt method - animate with CSS keyframes
  
        console.log('SVG element', id, 'length of stroke:', strokeLength);

        const triggers = svg.getAttribute("data-draw-trigger").split(",");

        if (triggers.includes("hover") && triggers.includes("click")){
            console.warn('SVG element', id, 'cannot include both hover and click triggers')

        };

        function drawStroke(){
            gsap.set(stroke, {
              strokeDashoffset:0})
            

            gsap.from(stroke, {
                strokeDashoffset: (strokeLength),
                duration: 2,
                ease:"power1.out",
                overwrite: true})
            }
  
        // Page load trigger
        if (triggers.includes("load")) {
            drawStroke ()};
        
  
        // Hover trigger
        if (triggers.includes("hover")) {
            let animation;

            function drawStrokeLoop () {
            gsap.set(stroke, {
                strokeDashoffset: (strokeLength)
            })

            gsap.to(stroke, {
                strokeDashoffset: 0,
                duration: 2,
                repeat: -1,
                ease:"power1.out",
                })
                
            };

             svg.addEventListener("mouseenter", () => {
                drawStrokeLoop()
        
            }); 

             svg.addEventListener("mouseleave", () => {
                gsap.to(stroke, {
                strokeDashoffset: 0,
                overwrite: true
            });
        });
        }
        
        
      
        // Click trigger
        if (triggers.includes("click")) {
          svg.addEventListener("click", () => {
            drawStroke()
          });
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

   