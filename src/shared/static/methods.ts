declare global {
    interface Number {
        fprice(): string;
    }
}

Number.prototype.fprice = function() {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
}

