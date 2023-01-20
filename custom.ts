
/**
* Nutze diese Datei für benutzerdefinierte Funktionen und Blöcke.
* Weitere Informationen unter https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */

//% weight=100 color=#0fbc11 icon="\uf14b" block="128x64 Display_z"
namespace oled_z {
    let zpar = [1.0,1.0,0.0,0.0,0.0,0.0,1.1];
/*
    zpar[0] = 1.0;   // Maßstab x-Achse
    zpar[1] = 1.0;   // Maßstab y-Achse
    zpar[2] = 0.0;   // Nullpunt x-Achse
    zpar[3] = 0.0;   // Nullpunt y-Achse
    zpar[4] = 0.0;   // Drehwinkel zu x-Achse
    zpar[5] = 0.0;   // Drehwinkel zu y-Achse
    zpar[6] = 1.1;   // Strichart . Werkzeugnummer (Strichbreite)
*/
    let lx: number
    let ly: number
    let ix:number
    let iy:number

    function grabo(w:any){
        let grabo=w*0.017453292
        return grabo
    }
    
    function bogra(w:any) {
        let bogra = w * 57.29578
        return bogra
    }

    function zkoord(x:number, y:number){
        let xt=grabo(zpar[4])
        let yt=grabo(zpar[5])
        let c1=Math.cos(xt)
        let c2=Math.cos(yt)
        let s1=Math.sin(xt)
        let s2=Math.sin(yt)
        xt = x * zpar[0]
        yt = y * zpar[1]
        ix=1*(xt*c1-yt*s2+zpar[2])
        iy=1*(yt*c2+xt*s1+zpar[3])
        return
    }

    /**
     * Ändert einen Zeichnungsparameter nrpar auf den Wert wert
     */
    //% blockId=oled_zparneu
    //% block="Setze den Zeichnungsparamerter nrpar %nrpar auf wert %wert"
    //% inlineInputMode=inline
    //% nrpar.min=0 nrpar.max=6
    //% wert.min=0 wert.max=6
    //% weight=100 blockGap=8
    export function zparneu(nrpar:number, wert:any){
        if (nrpar <= 0 && nrpar >6) return
        zpar[nrpar]=wert
    }
 
    /**
     * Ändert den Maßstab für die x-Achse und die y-Achse
     */
    //% blockId=oled_zmassb
    //% block="Setze den Maßstab auf xm %XM und ym %YM"
    //% inlineInputMode=inline
    //% weight=90 blockGap=8
    export function zmassb(xm:any, ym:any){
        zparneu(0,xm)
        zparneu(1,ym)
    }
    
    /**
     * Ändert den Nullpunkt xn %xn und yn %yn
     */
    //% blockId=oled_znullp
    //% block="Setze den Nullpunkt auf xn %xn und yn %yn"
    //% inlineInputMode=inline
    //% weight=80 blockGap=8
    export function znullp(xn:number, yn:number) {
        zparneu(2, xn)
        zparneu(3, yn)
    }

    /**
     * Ändert den Drehwinkel der x-Achse %xw und y-Achse %yw
     */
    //% blockId=oled_zdrehw
    //% block="Setze den Drehwinkel für x-Achse %xw und y-Achse %yw"
    //% inlineInputMode=inline
    //% weight=70 blockGap=8
    export function zdrehw(xw:any, yw:any) {
        zparneu(4, xw)
        zparneu(5, yw)
    }

    /**
     * Zeichnet ein Polygon mit n Punkten in den Feldern x und y auf dem oled-display
     */
    //% blockId=oled_zlinie
    //% block="Zeichne Polygon mit %n Punkten im Feld x %x und y %y"
    //% inlineInputMode=inline
    //% weight=50 blockGap=8
    export function zlinie(n:number){
        if (n<1) return
        let xx=xarr[0]
        let yy=yarr[0]
        zkoord(xx, yy)
        lx = ix
        ly = iy
        for (let i = 1; i < n; i++) {
            xx = xarr[i]
            yy = yarr[i]
            zkoord(xx, yy)
            oled_Line1(lx,ly,ix,iy)
            lx=ix
            ly=iy
        }
    }

    /**
     * Zeichnet eine Linie auf dem oled-display
     * @param x0 Start (0-128)
     * @param y0 Start (0-64)
     * @param x1 Ende (0-128)
     * @param y1 Ende (0-64)
     */
    //% blockId=oled_Line1
    //% block="Zeichne Linie von x0 %x0 y0 %y0 nach x1 %x1 y1 %y1"
    //% inlineInputMode=inline
    //% x0.min=0 x0.max=128
    //% y0.min=0 x0.max=64
    //% x1.min=0 x1.max=128
    //% y1.min=0 y1.max=64
    //% weight=60 blockGap=8
    export function oled_Line1(x0: number, y0: number, x1: number, y1: number){
        let dx: number
        let dy: number
        let sx: number
        let sy: number
        let x: number
        let y: number
        let err: number
        let e2: number

        x = x0
        y = y0
        dx = Math.abs(x1 - x0)
        dy = -1 * Math.abs(y1 - y0)
        if (x0 < x1) {
            sx = 1
        } else {
            sx = -1
        }
        if (y0 < y1) {
            sy = 1
        } else {
            sy = -1
        }
        err = dx + dy
        while (true) {
            kitronik_VIEW128x64.setPixel(x, y, 1)
            if (x == x1 && y == y1) {
                break;
            }
            e2 = 2 * err
            if (e2 > dy) {
                err += dy
                x += sx
            }
            if (e2 < dx) {
                err += dx
                y += sy
            }
        }
    }

    /**
     * Zeichnet einen Kreis auf dem oled-display
     * @param Mittelpunkt xm (0-128)
     * @param Mittelpunkt ym (0-64)
     * @param r Radius (0-128)
     */
    //% blockId=oled_Kreis
    //% block="Zeichne Kreis mit (xm,ym)%xm%ym und Radius%R"
    //% inlineInputMode=inline
    //% weight=40 blockGap=8
    export function oled_Kreis(xm: number, ym: number, r: number) {
        let f = 1 - r;
        let ddF_x = 0;
        let ddF_y = -2 * r;
        let x = 0;
        let y = r;

        kitronik_VIEW128x64.setPixel(xm, ym + r, 1);
        kitronik_VIEW128x64.setPixel(xm, ym - r, 1);
        kitronik_VIEW128x64.setPixel(xm + r, ym, 1);
        kitronik_VIEW128x64.setPixel(xm - r, ym, 1);

        while (x < y) {
            if (f >= 0) {
                y -= 1;
                ddF_y += 2;
                f += ddF_y;
            }
            x += 1;
            ddF_x += 2;
            f += ddF_x + 1;

            kitronik_VIEW128x64.setPixel(xm + x, ym + y, 1);
            kitronik_VIEW128x64.setPixel(xm - x, ym + y, 1);
            kitronik_VIEW128x64.setPixel(xm + x, ym - y, 1);
            kitronik_VIEW128x64.setPixel(xm - x, ym - y, 1);
            kitronik_VIEW128x64.setPixel(xm + y, ym + x, 1);
            kitronik_VIEW128x64.setPixel(xm - y, ym + x, 1);
            kitronik_VIEW128x64.setPixel(xm + y, ym - x, 1);
            kitronik_VIEW128x64.setPixel(xm - y, ym - x, 1);
        }
    }
}
