export default angular
    .module("rHeader", [])
    .component("resumeHeader", {
        templateUrl: "components/rHeader/cmpt.html",
        controller: ResumeHeaderCtrl,
        bindings: {
            pageIndex: "="
        }
    })
    .directive("opacityCallback", [
        function () {
            function link($scope, ele) {
                let vm = $scope.$ctrl;
                ele[0].addEventListener("webkitTransitionEnd", transitionEndHandler);
                function transitionEndHandler() {
                    if (vm.isShowNav) {
                        ele[0].style.display = vm.isShowNav ? "block" : "none";
                    }
                }
            }
            return {
                restrict: "A",
                link: link
            }
        }
    ])
    .directive("selectedNavItem", [
        function () {

            function link($scope, ele) {
                let vm = $scope.$ctrl;

                ele[0].addEventListener("click", clickHandler);
                function clickHandler(evt) {
                    if (evt.target.nodeName != "LI") {
                        return;
                    }
                    (evt.target.dataset.index !== vm.pageIndex) && (vm.pageIndex = evt.target.dataset.index);
                    vm.isShowNav = false;
                    $scope.$apply();
                }
            }

            return {
                restrict: "A",
                link: link
            }
        }
    ])
    .name;

ResumeHeaderCtrl.$inject = ["resumeData","$scope"];

function ResumeHeaderCtrl(resumeData) {

    let vm = this;

    console.log(vm);

    resumeData.extend(vm, resumeData.data.cn.header);

    vm.pageIndex = 0;

}