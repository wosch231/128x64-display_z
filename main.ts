input.onButtonPressed(Button.A, function () {
    oled_z.oled_Line1(64, 0, 38, 60)
    oled_z.oled_Line1(38, 60, 94, 24)
    oled_z.oled_Line1(94, 24, 34, 24)
    oled_z.oled_Line1(34, 24, 84, 64)
    oled_z.oled_Line1(84, 64, 64, 0)
})
input.onButtonPressed(Button.AB, function () {
    kitronik_VIEW128x64.drawRect(60, 30, 34, 0)
})
input.onButtonPressed(Button.B, function () {
    oled_z.Kreis(64, 32, 31)
})
basic.showIcon(IconNames.Surprised)
kitronik_VIEW128x64.clear()
let win = 360 / 5
let z = [0, 1, 0]
for (let Index = 0; Index <= 4; Index++) {
    z.insertAt(Index, 11)
}
