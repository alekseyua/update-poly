from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from public_model.admin import public_model
from django_cron import CronJobBase, Schedule
from .models import Feedback_top, Feedback
from application.parsings.models import Parsing, ParsingImage, ParsingPublications
from application.telegram.models import User, String
from application.parsings.signals import delete_parsing_msg
from django.apps import apps
import telebot




@public_model
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):

    list_display = ('date_create', 'author', 'user', 'rating', )
    list_display_links = ('date_create', )

    fieldsets = (
        (None, {
            'fields': ('author', 'user', 'rating', 'text', )
        }),
        (_('Dates'), {
            'fields': ('date_create', )
        }),
    )
    search_fields = ['text', 'author__username', 'author__last_name', 'author__first_name', 'user__username',
                     'user__last_name', 'user__first_name']
    readonly_fields = ['date_create']
    date_hierarchy = 'date_create'
    raw_id_fields = ['user', 'author']


class MyCronJob(CronJobBase):
    RUN_EVERY_MINS = 6 # every 2 hours

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'application.rating.my_cron_job'    # a unique code

    def do(self):
        print('begin')
        try:
            Feedback_top.objects.all().delete()
        except:
            pass
        feed1 = Feedback.objects.filter(rating=5)
        for ss in feed1:
            user = ss.user
            try:
                Feedback_top.objects.get(user=user)
                #continue
            except:
                count1 = Feedback.objects.filter(user=user).count()
                s = Feedback_top(user=user, comments=count1)
                s.save()
        print('begin sending')
        try:
            from application.telegram.utils import escape
            import datetime
            users = User.objects.all().filter(status__in=[1,3], notification_sended=False)
            bot_main = apps.get_app_config('telegram').bot
            bot_s = apps.get_app_config('subscription').bot
            for user in users:
                if user.pay_date_end - datetime.datetime.now() < datetime.timedelta(days=int(1)):
                    try:
                        bot_main.send_message(user.telegram_id,escape(String.get_string('message_user_pay_will_end')))
                    except:
                        #time.sleep(1)
                        try:
                            bot_main.send_message(user.telegram_id,escape(String.get_string('message_user_pay_will_end')))
                        except:
                            pass

                    try:
                        bot_s.send_message(user.telegram_id,escape(String.get_string('message_user_pay_will_end')))
                    except:
                        #time.sleep(1)
                        try:
                            bot_s.send_message(user.telegram_id,escape(String.get_string('message_user_pay_will_end')))
                        except:
                            pass
                    user.notification_sended = True
                    user.save()
        except Exception as e:
            print(e)

    """print('Begin')
    users = User.objects.all()
    for user in users:
        if user.is_manager:
            user.is_filter_spare = True
            user.is_filter_respair = True
            user.is_filter_transport = True
            user.is_filter_unit = True
            user.is_filter_truck = True
            user.save()
    print('End')"""
