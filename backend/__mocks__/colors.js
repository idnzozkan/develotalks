const colors = jest.createMockFromModule("colors")

const unit = s => s

colors.green = unit
colors.green["bold"] = unit
colors.bgGreen = unit
colors.bgGreen["black"] = unit
colors.red = unit
colors.red["bold"] = unit

module.exports = colors
