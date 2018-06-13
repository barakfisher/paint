from bottle import run, get
import bottle as b
import sys


@get('/js/<filename:re:.*\.js>')
def javascripts(filename):
    return b.static_file(filename, root="js")

@get('/js/<filename:re:.*\.png>')
def images(filename):
    return b.static_file(filename, root="images")

@get('/js/<filename:re:.*\.js>')
def css(filename):
    return b.static_file(filename, root="css")

@get('/')
def index():
    return b.template('paint.html')


# def main():
#     run(host='0.0.0.0', port=sys.argv[1])
def main():
    run(host='localhost', port=7000)


if __name__ == '__main__':
    main()
