
/**
* Nutze diese Datei für benutzerdefinierte Funktionen und Blöcke.
* Weitere Informationen unter https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */

//% weight=100 color=#0fbc11 icon="\uf14b" block="128x64 Display_z"
namespace oled_z {
    /**
     * Zeichnet eine Linie auf dem oled-display
     * @param x0 Start (0-16)
     * @param y0 Start (0-6)
     * @param x1 Ende (0-16)
     * @param y1 Ende (0-6)
     * @param brightness (0-255)
     */
    //% blockId=oled_Line1
    //% block="Zeichne Linie von x0 %x0 y0 %y0 nach x1 %x1 y1 %y1"
    //% inlineInputMode=inline
    //% x0.min=0 x0.max=16
    //% y0.min=0 x0.max=6
    //% x1.min=0 x1.max=16
    //% y1.min=0 y1.max=6
    //% weight=70 blockGap=8
    export function oled_Line1(x0: number, y0: number, x1: number, y1: number): void {
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

    //% blockId=Kreis
    //% block="Zeichne Kreis mit (xm,ym)%xm%ym und Radius%R"
    //% inlineInputMode=inline
    //% weight=60 blockGap=8
    export function Kreis(xm: number, ym: number, r: number) {
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
