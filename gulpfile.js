var gulp = require('gulp'),
	babel=require('gulp-babel'),
    //cssmin = require('gulp-minify-css'),             //css压缩
    uglify = require('gulp-uglify'),               //js压缩
    //imagemin = require('gulp-imagemin'),            //图片的压缩
    //base64 = require('gulp-base64') ,               //- 把小图片转成base64字符串
    htmlmin = require('gulp-htmlmin') ;  
    //html的压缩
 
// 压缩 js 文件
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('dist/js/*.js')
    	.pipe(babel({ presets:['env'] }))
    // 2. 压缩文件
        .pipe(uglify({ mangle: false }))
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('./js/'));
});

gulp.task('investmentJs', function() {
    gulp.src(['dist/investment/js/*.js'])
    	.pipe(babel({ presets:['env'] }))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('./investment/js/'));
});
gulp.task('investmentnewJs', function() {
    gulp.src(['dist/investmentnew/js/*.js'])
    	.pipe(babel({ presets:['env'] }))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('./investmentnew/js/'));
});
//压缩html文件
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('dist/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./'));
}); 
gulp.task('investmentHtml', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('dist/investment/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./investment/'));
});
gulp.task('investmentHtmlnew', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('dist/investmentnew/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./investmentnew/'));
});
 gulp.task('watch', function() {
    //livereload.listen();
    gulp.watch(['dist/js/*.js'], ['script']);
    gulp.watch(['dist/investment/js/*.js'], ['investmentJs']); 
    gulp.watch(['dist/investmentnew/js/*.js'], ['investmentnewJs']); 
    gulp.watch(['dist/*.html'], ['html']);
    gulp.watch(['dist/investment/*.html'], ['investmentHtml']);
    gulp.watch(['dist/investmentnew/*.html'], ['investmentHtmlnew']);
});
/* 合并上述我的方法 监控并执行任务 */
gulp.task('default',['script','html','investmentHtml','investmentJs','investmentHtmlnew','investmentnewJs','watch']);

/**
 * 新手任务
 */
gulp.task('newTaskHtml', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('dist/newTask/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./newTask/'));
});
//gulp.task('newTaskJs', function() {
//  gulp.src(['dist/newTask/js/*.js'])
//  	.pipe(babel({ presets:['env'] }))
//      .pipe(uglify({ mangle: false }))
//      .pipe(gulp.dest('./newTask/js/'));
//});
gulp.task('newTaskImg', function() {
    gulp.src(['dist/newTask/img/*.{png,gif,jpg}'])
        .pipe(gulp.dest('./newTask/img/'));
});
gulp.task('newTaskCss', function () {
   gulp.src('dist/newTask/css/*.css')   
       .pipe(gulp.dest('./newTask/css/'));
});
 gulp.task('watchNewTask', function() {
    gulp.watch(['dist/newTask/*.html'],['newTaskHtml']);
    //gulp.watch(['dist/newTask/js/*.js'], ['newTaskJs']); 
    gulp.watch(['dist/newTask/img/*.{png,jpg,gif}'], ['newTaskImg']); 
    gulp.watch(['dist/newTask/css/*.css'], ['newTaskCss']); 
});
gulp.task('newTask',['newTaskHtml','newTaskImg','newTaskCss','watchNewTask']);
//压缩  img文件
// gulp.task('testImagemin', function () {
//     gulp.src('img/*.{png,jpg,gif,ico}')
//         .pipe(imagemin({
//             optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
//             progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//             interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//             multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
//         }))
//         .pipe(gulp.dest('./img/'));
// });
// gulp.task('turnplateJs', function() {
//     gulp.src('turnplate/js2/*.js')
//         .pipe(uglify({ mangle: false }))
//         .pipe(gulp.dest('./turnplate/js/'))
// })
 
//压缩  css文件   和base64 和文件名加md5后缀
// gulp.task('testCssmin', function () {
//     gulp.src('css2/*.css')   
//     .pipe(base64())
//         // .pipe(rev())               //文件名加md5后缀
//         .pipe(cssmin())
//         // .pipe(rev.manifest())　　　　　　　　 //rev-mainfest.json文件，里面是压缩文件的信息
//         .pipe(gulp.dest('./css/'));
// }); 
// gulp.task('investmentCss', function () {
//     gulp.src('investment/css2/*.css')   
//     .pipe(base64())
//         // .pipe(rev())               //文件名加md5后缀
//         .pipe(cssmin())
//         // .pipe(rev.manifest())　　　　　　　　 //rev-mainfest.json文件，里面是压缩文件的信息
//         .pipe(gulp.dest('./investment/css/'));
// });
