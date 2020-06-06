export default {
    install(Vue) {
        Vue.prototype.makeNone = function (item) {
            this.$refs[item].style.display = "none"
        },
            Vue.prototype.makeBlock = function (item) {
                this.$refs[item].style.display = "inline-block";
            },
            Vue.prototype.isNull = function (word) {
                if (word.replace(/(^s*)|(s*$)/g, "").length == 0) {
                    return true;
                } else {
                    return false;
                }
            }
        Vue.prototype.dealSession = function () {
            this.sessionCode = sessionStorage.getItem('sessionCode')
            if (!this.sessionCode) {
                this.$router.push({ url: "404.html", name: "404" });
            }
        }
        Vue.prototype.catchError = function () {
            this.$message({
                type: "warning",
                duration: 1000,
                message: "服务器繁忙"
            });
        }
    }
}