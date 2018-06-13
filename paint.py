from bottle import run, get
import bottle as b
from sys import argv


@get('/js/<filename:re:.*\.js>')
def javascripts(filename):
    return b.static_file(filename, root="js")


@get('/images/<filename:re:.*\.png>')
def images(filename):
    return b.static_file(filename, root="images")


@get('/css/<filename:re:.*\.css>')
def css(filename):
    return b.static_file(filename, root="css")



@get('/')
def index():
    return b.template('paint.html')


def main():
    run(host='0.0.0.0', port=argv[1])


if __name__ == '__main__':
    main()
