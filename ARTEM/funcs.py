import datetime
import time
from application.telegram.models import User
from application.telegram.utils import set_procedure, escape, get_user

from django.db.models import Avg
from django.db.models import Count, Avg

from application.parsings.models import Parsing, ParsingImage, ParsingPublications,Archive
from application.parsings.signals import delete_parsing_msg

from .menu import *
from ..models import Feedback,Feedback_top
import datetime


def print_rating_menu(bot, message):

    # user = get_user(message)
    # if not user.full_access:
    #
    #     bot.send_message(
    #         message.chat.id,
    #         String.get_string('message_restriction_func'),
    #         parse_mode='Markdown'
    #     )
    #     return

    bot.send_message(
        message.chat.id,
        String.get_string('message_rating_text'),
        parse_mode='Markdown',
        reply_markup=menu_rating_menu()
    )
    #bot.send_message(
        #message.chat.id,
        #str(message.chat.id)
    #)

    set_procedure(message, 'rating', 'process_rating_menu')

def test(bot, message):
    user = get_user(message)
    if int(user.telegram_id) == 1388514475 or int(user.telegram_id) == 1033806475:
        req = Parsing.objects.filter(date_create__range=["2018-04-11", "2020-01-01"])
        reqall = Parsing.objects.all()

        time.sleep(1)
        bot.send_message(
            message.chat.id,
            str(req.count())
        )
        bot.send_message(
            message.chat.id,
            str(reqall.count())
        )

        req.delete()
        reqall = Parsing.objects.all()
        bot.send_message(
            message.chat.id,
            str(reqall.count())
        )
        """uu = 0
        for tt in req:
            time.sleep(1)
            publications = ParsingPublications.objects.filter(parsing=tt)
            bot.send_message(
                message.chat.id,
                str(publications.count())
            )
            if publications.count() > 0:
                for i in publications:
                    delete_parsing_msg(bot, i)
            publications.delete()
            uu = uu + 1

            bot.send_message(
                message.chat.id,
                str(uu)
            )
            tt.delete()

        req1 = Parsing.objects.filter(user__is_banned=True)
        bot.send_message(
            message.chat.id,
            str(req1.count())
        )"""





def print_top(bot, message):
    feed = Feedback_top.objects.all()[:200] #200
    feeds1 = []


    for gg in feed:
        try:
            tele = User.objects.get(id=gg.user.id)

            if tele.__usr__() != '' and tele.__usr__() != ' ' and tele.__usr__() != None and tele.__usr__() != '-':
                if tele.__str__() != '' and tele.__str__() != ' ' and tele.__str__() != None and tele.__str__() != '-':
                    if tele.__usr__() and tele.__str__() and bool(str(tele.__usr__()).strip()) == True and bool(str(tele.__str__()).strip()) == True:
                        feeds1.append([str(tele.__str__()), str(tele.__usr__()), gg.comments, tele.telegram_id])

        except:
            continue

    string1 = ''
    string2 = ''
    x = 1
    feeds2 = feeds1[:100]
    otcev = [ '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']

    for tt in feeds2:
        user = tt.user
        try:
            data_join = user.date_join.strftime("%m/%d/%Y")
        except:
            data_join = '0'
        if x <= 50:
            if '_' in tt[1]:
                username = str(tt[1]).replace('_', '\_')
            else:
                username = str(tt[1])
            username1 = str(tt[0])
            for cc in otcev:
                if cc in tt[0]:
                    username1 = str(username1).replace(cc, str("\\") + cc)
            mes1 = str(x)
            mes2 = '[{}]'.format(username1)
            href = 'https://t.me/{}'.format(username)
            mes3 = '({})'.format(str(href))
            mes4 = str(mes2) + str(mes3)
            string1 = string1 + str(x) + '\. ' + '{} отзывов '.format(str(tt[2]))  +  str(mes4) + '\n' + str(data_join)
        else:
            if '_' in tt[1]:
                username = str(tt[1]).replace('_', '\_')
            else:
                username = str(tt[1])
            username1 = str(tt[0])
            for cc in otcev:
                if cc in tt[0]:
                    username1 = str(username1).replace(cc, str("\\") + cc)
            mes1 = str(x)
            mes2 = '[{}]'.format(username1)
            href = 'https://t.me/{}'.format(username)
            mes3 = '({})'.format(str(href))
            mes4 = str(mes2) + str(mes3)
            string2 = string2 + str(x) + '\. ' + '{} отзывов '.format(str(tt[2])) + str(mes4) + '\n' + '\n'

        x = x + 1
    bot.send_message(
        message.chat.id,
        string1,
        parse_mode='MarkdownV2',
        reply_markup=menu_rating(),
        disable_web_page_preview=True
    )
    bot.send_message(
        message.chat.id,
        string2,
        parse_mode='MarkdownV2',
        reply_markup=menu_rating(),
        disable_web_page_preview=True
    )













    set_procedure(message, 'rating', 'process_rating')

def print_rating(bot, message):

    # user = get_user(message)
    # if not user.full_access:
    #
    #     bot.send_message(
    #         message.chat.id,
    #         String.get_string('message_restriction_func'),
    #         parse_mode='Markdown'
    #     )
    #     return

    bot.send_message(
        message.chat.id,
        String.get_string('message_rating'),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )

    set_procedure(message, 'rating', 'process_rating')


def print_user_not_found(bot, message, username):

    bot.send_message(
        message.chat.id,
        String.get_string('message_rating_user_not_found').format(username=escape(username)),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )

    set_procedure(message, 'rating', 'process_rating')


def print_user_not_found_create(bot, message, username):

    bot.send_message(
        message.chat.id,
        String.get_string('message_rating_user_not_found').format(username=escape(username)),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )

    set_procedure(message, 'rating', 'process_rating_create_username')


def print_user_new(bot, message, username):

    bot.send_message(
        message.chat.id,
        String.get_string('message_rating_new_user').format(username=escape(username)),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )

    set_procedure(message, 'rating', 'process_rating')


def print_user(bot, message, user):

    fbs = Feedback.objects.filter(is_public=True, user=user).prefetch_related('author')

    s = ''

    if user.seller_rating:
        s += 'Рейтинг: ' + '⭐️' * user.seller_rating + '\n'
    else:
        try:
            avg = round(fbs.aggregate(Avg('rating'))['rating__avg'])
            if avg:
                s += 'Рейтинг: ' + '⭐️' * avg + '\n'
        except:
            pass

    if user.seller_address:
        s += 'Адрес: `' + user.seller_address + '`\n'
    if user.seller_organization:
        s += 'Название организации: `' + user.seller_organization + '`\n'
    if user.seller_worked:
        s += 'С кем работал: `' + user.seller_worked + '`\n'
    else:
        authors_tx = []
        for i in fbs:
            authors_tx.append('[%s](tg://user?id=%s)' % (i.author, i.author.telegram_id))
        s += 'С кем работал: ' + ', '.join(authors_tx) + '\n'

    if user.seller_comment:
        s += 'Примечание: ' + user.seller_comment + '\n'

    bot.send_message(
        message.chat.id,
        String.get_string('message_rating_user').format(
            username=escape(user.username),
            data=s
        ),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )

    for i in fbs:
        bot.send_message(
            message.chat.id,
            String.get_string('message_feedback').format(
                user=i.author,
                user_id=i.author.telegram_id,
                date=datetime.datetime.strftime(i.date_create, '%d.%m.%Y %H:%M'),
                rating='⭐️' * i.rating,
                text=i.text,
            ),
            parse_mode='Markdown'
        )


def print_rating_create_username(bot, message):

    bot.send_message(
        message.chat.id,
        String.get_string('message_feedback_create_username'),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )

    set_procedure(message, 'rating', 'process_rating_create_username')


def print_rating_create_self_error(bot, message):

    bot.send_message(
        message.chat.id,
        String.get_string('message_feedback_create_self_error'),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )


def print_rating_create_exists_error(bot, message):

    bot.send_message(
        message.chat.id,
        String.get_string('message_feedback_create_exists_error'),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )


def print_rating_create_text(bot, message, user_id):

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        print_user_not_found_create(bot, message, '')
        return

    bot.send_message(
        message.chat.id,
        String.get_string('message_feedback_create_text').format(user=escape(user.username)),
        parse_mode='Markdown',
        reply_markup=menu_rating()
    )

    set_procedure(message, 'rating', 'process_rating_create_text', [user_id])


def print_rating_create_rating(bot, message, user_id, text):

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        print_user_not_found_create(bot, message, '')
        return

    bot.send_message(
        message.chat.id,
        String.get_string('message_feedback_create_rating').format(user=escape(user.username)),
        parse_mode='Markdown',
        reply_markup=menu_rating_create_rating()
    )

    set_procedure(message, 'rating', 'process_rating_create_rating', [user_id, text])


def print_rating_create_done(bot, message, user_id, text, rating):

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        print_user_not_found_create(bot, message, '')
        return

    rating_text = '⭐' * int(rating)

    bot.send_message(
        message.chat.id,
        String.get_string('message_feedback_create_done').format(
            user=escape(user.username), text=text, rating=rating_text
        ),
        parse_mode='Markdown',
        reply_markup=menu_rating_create_done()
    )

    set_procedure(message, 'rating', 'process_rating_create_done', [user_id, text, rating])


def print_rating_created(bot, message):

    bot.send_message(
        message.chat.id,
        String.get_string('message_feedback_created'),
        parse_mode='Markdown'
    )

    print_rating_menu(bot, message)
